
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, MessageSquare, X, Send } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your PMPML assistant. How can I help you with bus passes today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage.trim(),
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage("");

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse = getBotResponse(newMessage.trim());
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  // Simple bot response logic based on keywords
  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("pass") && lowerMessage.includes("price")) {
      return "PMPML pass prices are: 1-day pass: ₹50, 1-month pass: ₹350, 3-month pass: ₹750.";
    } else if (lowerMessage.includes("document") || lowerMessage.includes("required")) {
      return "For 1-day passes, you need your Aadhar card number and address. For 1-month and 3-month passes, you also need a passport-sized photo and school/college bonafide certificate.";
    } else if (lowerMessage.includes("valid") || lowerMessage.includes("validity")) {
      return "Our passes are valid for PMPML buses only. The validity period starts from the date of issue.";
    } else if (lowerMessage.includes("refund") || lowerMessage.includes("cancel")) {
      return "Refunds are available within 24 hours of purchase. Please contact our customer service for assistance.";
    } else if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return "Hello there! How can I help you with PMPML bus passes today?";
    } else if (lowerMessage.includes("thank")) {
      return "You're welcome! Is there anything else I can help you with?";
    } else {
      return "I'm sorry, I don't have specific information about that. Would you like to know about pass prices, required documents, validity, or refund policy?";
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chatbot button */}
      <button
        onClick={toggleChatbot}
        className="fixed bottom-6 right-6 bg-pmpml-red text-white rounded-full p-3 shadow-lg hover:bg-pmpml-red/90 transition-all z-50"
        aria-label="Open chatbot"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chatbot panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 md:w-96 bg-white rounded-lg shadow-xl overflow-hidden z-50 border border-gray-200 flex flex-col max-h-[500px]">
          {/* Header */}
          <div className="bg-pmpml-red text-white p-3 flex items-center gap-2">
            <Bot size={20} />
            <div>
              <h3 className="font-medium">PMPML Assistant</h3>
              <p className="text-xs opacity-80">Ask about passes and services</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto max-h-80">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-3 max-w-[80%] ${
                  message.sender === "user" ? "ml-auto" : "mr-auto"
                }`}
              >
                <div
                  className={`p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-pmpml-red text-white rounded-tr-none"
                      : "bg-gray-100 text-gray-800 rounded-tl-none"
                  }`}
                >
                  {message.text}
                </div>
                <div
                  className={`text-xs mt-1 ${
                    message.sender === "user" ? "text-right" : "text-left"
                  } text-gray-500`}
                >
                  {formatTime(message.timestamp)}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-3 flex items-end gap-2">
            <Textarea
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="resize-none min-h-[60px]"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button
              className="bg-pmpml-red hover:bg-pmpml-red/90 h-10 w-10 p-2 rounded-full flex-shrink-0"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              aria-label="Send message"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
