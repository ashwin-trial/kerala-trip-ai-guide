
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Download, Sparkles } from "lucide-react";

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
    <div className="flex flex-col h-full overflow-hidden bg-faroe-dark/90 backdrop-blur-sm rounded-2xl border border-faroe-gold/20 shadow-xl">
      <div className="bg-gradient-to-r from-faroe-dark to-faroe-gray-dark p-4 rounded-t-2xl flex items-center border-b border-faroe-gold/20">
        <Sparkles className="w-5 h-5 text-faroe-gold mr-2" />
        <h2 className="text-xl font-serif font-medium text-white">Kerala Travel Assistant</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-faroe-gold/20 scrollbar-track-transparent">
        {messages.length === 0 ? (
          <div className="text-center p-8 rounded-xl bg-faroe-gray-light/10 backdrop-blur-sm">
            <p className="text-white/80">Start planning your Kerala trip by saying hello!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div 
              key={message.id}
              className={message.sender === 'user' 
                ? 'chat-bubble-user' 
                : 'chat-bubble-ai'}
            >
              {message.content}
            </div>
          ))
        )}
        
        {isProcessing && (
          <div className="chat-bubble-ai bg-faroe-gray-light/20 backdrop-blur-sm">
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-faroe-gold animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-faroe-gold animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-faroe-gold animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-faroe-gold/20 bg-faroe-gray-dark/30 rounded-b-2xl">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tell me about your trip to Kerala..."
            disabled={isProcessing}
            className="flex-1 bg-faroe-gray-light/10 border-faroe-gold/30 rounded-full px-4 py-2 focus-visible:ring-faroe-gold/50 text-white placeholder:text-white/50"
          />
          <Button 
            type="submit" 
            disabled={isProcessing || !input.trim()}
            className="bg-faroe-gold hover:bg-faroe-gold/90 text-faroe-dark rounded-full p-2 w-10 h-10"
          >
            <Send className="w-4 h-4" />
          </Button>
          <Button 
            type="button"
            variant="outline"
            onClick={onExportPDF}
            disabled={messages.length < 3}
            title="Download Itinerary"
            className="rounded-full p-2 w-10 h-10 border-faroe-gold/50 text-faroe-gold hover:bg-faroe-gold/20"
          >
            <Download className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
