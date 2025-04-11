
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import ChatInterface, { Message } from '@/components/ChatInterface';
import ItineraryDisplay, { Itinerary } from '@/components/ItineraryDisplay';
import { processUserMessage } from '@/services/aiService';
import generatePDF from '@/utils/pdfGenerator';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Initialize with a welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: '1',
          content: "Hi there! I'm your Kerala Trip Planning Assistant. I can help you create a personalized itinerary for your trip to Kerala, India's tropical paradise. Would you like to start planning your trip?",
          sender: 'ai'
        }
      ]);
    }
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsProcessing(true);
    
    try {
      const { responseMessage, updatedItinerary } = await processUserMessage([...messages, newUserMessage]);
      
      const newAiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseMessage,
        sender: 'ai'
      };
      
      setMessages(prev => [...prev, newAiMessage]);
      
      if (updatedItinerary) {
        setItinerary(updatedItinerary);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      toast({
        title: "Error",
        description: "Failed to process your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExportPDF = () => {
    if (itinerary) {
      generatePDF(itinerary);
      toast({
        title: "Success!",
        description: "Your itinerary is being prepared for download.",
      });
    } else {
      toast({
        title: "No itinerary available",
        description: "Please complete planning your trip first.",
        variant: "destructive"
      });
    }
  };

  // Mobile view shows only one panel at a time with a toggle
  if (isMobile) {
    const [showChat, setShowChat] = useState(true);
    
    return (
      <div className="flex flex-col h-screen">
        <header className="flex justify-between items-center p-4 bg-kerala-green text-white">
          <h1 className="text-xl font-heading">Kerala Trip Planner</h1>
          <button 
            onClick={() => setShowChat(!showChat)}
            className="px-3 py-1 bg-white/20 rounded text-sm"
          >
            {showChat ? 'View Itinerary' : 'Back to Chat'}
          </button>
        </header>
        
        <main className="flex-1 overflow-hidden">
          {showChat ? (
            <div className="h-full">
              <ChatInterface
                messages={messages}
                onSendMessage={handleSendMessage}
                isProcessing={isProcessing}
                onExportPDF={handleExportPDF}
              />
            </div>
          ) : (
            <div className="h-full">
              <ItineraryDisplay itinerary={itinerary} onExportPDF={handleExportPDF} />
            </div>
          )}
        </main>
      </div>
    );
  }

  // Desktop view shows split panels
  return (
    <div className="flex flex-col h-screen">
      <header className="p-4 bg-gradient-to-r from-kerala-green to-kerala-blue text-white">
        <h1 className="text-2xl font-heading text-center">Kerala Trip Planner AI</h1>
      </header>
      
      <main className="flex-1 flex overflow-hidden">
        <div className="w-1/2 border-r">
          <ChatInterface
            messages={messages}
            onSendMessage={handleSendMessage}
            isProcessing={isProcessing}
            onExportPDF={handleExportPDF}
          />
        </div>
        <div className="w-1/2">
          <ItineraryDisplay itinerary={itinerary} onExportPDF={handleExportPDF} />
        </div>
      </main>
      
      <footer className="p-3 bg-muted text-center text-sm text-muted-foreground">
        <p>Kerala Trip Planner AI · Plan your dream vacation to God's Own Country</p>
      </footer>
    </div>
  );
};

export default Index;
