
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';
import ChatInterface, { Message } from '@/components/ChatInterface';
import ItineraryDisplay, { Itinerary } from '@/components/ItineraryDisplay';
import { processUserMessage } from '@/services/aiService';
import generatePDF from '@/utils/pdfGenerator';
import { useIsMobile } from '@/hooks/use-mobile';
import { Home, Menu, X } from 'lucide-react';

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  // Mobile view with state for showing chat or itinerary
  const [showChat, setShowChat] = useState(true);
  
  // Mobile view shows only one panel at a time with a toggle
  if (isMobile) {
    return (
      <div className="flex flex-col h-screen bg-faroe-dark">
        {/* Floating Navbar */}
        <header className="fixed top-4 left-4 right-4 z-50 rounded-full bg-faroe-dark/80 border border-faroe-gold/30 backdrop-blur-md shadow-lg flex justify-between items-center p-3 px-5">
          <Link to="/" className="text-faroe-gold font-serif text-xl flex items-center">
            <Home className="w-5 h-5 mr-2" />
            Kerala Trips
          </Link>
          <button 
            onClick={() => setShowChat(!showChat)}
            className="px-3 py-1 bg-faroe-gold/20 hover:bg-faroe-gold/30 text-faroe-gold rounded-full text-sm transition-colors"
          >
            {showChat ? 'View Itinerary' : 'Back to Chat'}
          </button>
        </header>
        
        <main className="flex-1 overflow-hidden pt-16 p-4">
          <div className="max-w-3xl mx-auto h-full">
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
              <div className="h-full bg-faroe-dark/90 backdrop-blur-sm rounded-2xl border border-faroe-gold/20 shadow-xl overflow-auto">
                <ItineraryDisplay itinerary={itinerary} onExportPDF={handleExportPDF} />
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  // Desktop view shows split panels
  return (
    <div className="flex flex-col h-screen bg-faroe-dark">
      {/* Floating Navbar */}
      <header className="fixed top-6 left-6 right-6 z-50 rounded-full bg-faroe-dark/80 border border-faroe-gold/30 backdrop-blur-md shadow-lg">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link to="/" className="text-faroe-gold font-serif text-xl flex items-center">
            <Home className="w-5 h-5 mr-2" />
            Kerala Trips
          </Link>
          
          <div className="hidden md:flex space-x-6 text-white/80">
            <Link to="/" className="hover:text-faroe-gold transition-colors">Home</Link>
            <Link to="/planner" className="text-faroe-gold">Trip Planner</Link>
            <a href="#destinations" className="hover:text-faroe-gold transition-colors">Destinations</a>
            <a href="#about" className="hover:text-faroe-gold transition-colors">About</a>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-faroe-gold"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-faroe-dark/95 backdrop-blur-md border-t border-faroe-gold/20 rounded-b-3xl overflow-hidden shadow-lg">
            <div className="flex flex-col space-y-3 p-4">
              <Link to="/" 
                className="px-4 py-2 hover:bg-faroe-gold/10 rounded-lg text-white/80 hover:text-faroe-gold transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link to="/planner" 
                className="px-4 py-2 bg-faroe-gold/10 rounded-lg text-faroe-gold"
                onClick={() => setMenuOpen(false)}
              >
                Trip Planner
              </Link>
              <a 
                href="#destinations" 
                className="px-4 py-2 hover:bg-faroe-gold/10 rounded-lg text-white/80 hover:text-faroe-gold transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Destinations
              </a>
              <a 
                href="#about" 
                className="px-4 py-2 hover:bg-faroe-gold/10 rounded-lg text-white/80 hover:text-faroe-gold transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                About
              </a>
            </div>
          </div>
        )}
      </header>
      
      <main className="flex-1 flex overflow-hidden pt-24 p-6">
        <div className="w-1/2 pr-3">
          <ChatInterface
            messages={messages}
            onSendMessage={handleSendMessage}
            isProcessing={isProcessing}
            onExportPDF={handleExportPDF}
          />
        </div>
        <div className="w-1/2 pl-3">
          <div className="h-full bg-faroe-dark/90 backdrop-blur-sm rounded-2xl border border-faroe-gold/20 shadow-xl overflow-auto">
            <ItineraryDisplay itinerary={itinerary} onExportPDF={handleExportPDF} />
          </div>
        </div>
      </main>
      
      <footer className="py-3 px-6 text-center text-sm text-white/50 bg-faroe-dark/50 backdrop-blur-sm border-t border-faroe-gold/10">
        <p>Kerala Trip Planner AI · Plan your dream vacation to God's Own Country</p>
      </footer>
    </div>
  );
};

export default Index;
