
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SelectPassPage from "./pages/SelectPassPage";
import ApplyPassPage from "./pages/ApplyPassPage";
import PaymentPage from "./pages/PaymentPage";
import PassGeneratedPage from "./pages/PassGeneratedPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import { ChatbotWrapper } from "./components/ChatbotWrapper";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ChatbotWrapper>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/select-pass" element={<SelectPassPage />} />
            <Route path="/apply/:passType" element={<ApplyPassPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/pass-generated" element={<PassGeneratedPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ChatbotWrapper>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
