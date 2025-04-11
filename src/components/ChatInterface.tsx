
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Download } from "lucide-react";

export type Message = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
};

type ChatInterfaceProps = {
  onSendMessage: (message: string) => void;
  messages: Message[];
  isProcessing: boolean;
  onExportPDF: () => void;
};

const ChatInterface = ({ 
  onSendMessage, 
  messages, 
  isProcessing,
  onExportPDF
}: ChatInterfaceProps) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isProcessing) {
      onSendMessage(input);
      setInput('');
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="bg-kerala-green p-4 text-white">
        <h2 className="text-xl font-heading">Kerala Trip AI Assistant</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground p-8">
            <p>Start planning your Kerala trip by saying hello!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div 
              key={message.id}
              className={message.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}
            >
              {message.content}
            </div>
          ))
        )}
        
        {isProcessing && (
          <div className="chat-bubble-ai">
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-kerala-green animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-kerala-green animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-kerala-green animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tell me about your trip to Kerala..."
            disabled={isProcessing}
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={isProcessing || !input.trim()}
            className="bg-kerala-green hover:bg-kerala-green-dark"
          >
            <Send className="w-4 h-4" />
          </Button>
          <Button 
            type="button"
            variant="outline"
            onClick={onExportPDF}
            disabled={messages.length < 3}
            title="Download Itinerary"
          >
            <Download className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
