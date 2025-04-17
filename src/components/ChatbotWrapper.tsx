
import { Chatbot } from "./Chatbot";

interface ChatbotWrapperProps {
  children: React.ReactNode;
}

export function ChatbotWrapper({ children }: ChatbotWrapperProps) {
  return (
    <div className="relative">
      {children}
      <Chatbot />
    </div>
  );
}
