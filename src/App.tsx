
import { useEffect, useState } from "react";
import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import HomePage from "./pages/HomePage";
import SelectPassPage from "./pages/SelectPassPage";
import ApplyPassPage from "./pages/ApplyPassPage";
import PaymentPage from "./pages/PaymentPage";
import PassGeneratedPage from "./pages/PassGeneratedPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import { ChatbotWrapper } from "./components/ChatbotWrapper";

const queryClient = new QueryClient();

function AuthRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    return <>{children}</>; // No longer redirecting to login
  }

  return <>{children}</>;
}

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Simulate authentication check
    setTimeout(() => {
      setIsLoading(false);
    }, 500);

    fetch("/api/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("Error:", err));
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ChatbotWrapper>
            <div className="ml-4 mt-2">
              <p className="text-green-700 font-semibold">
                ✅ Backend says: {message}
              </p>
            </div>
            <Routes>
              <Route path="/" element={<AuthRoute><HomePage /></AuthRoute>} />
              <Route path="/select-pass" element={<AuthRoute><SelectPassPage /></AuthRoute>} />
              <Route path="/apply/:passType" element={<AuthRoute><ApplyPassPage /></AuthRoute>} />
              <Route path="/payment" element={<AuthRoute><PaymentPage /></AuthRoute>} />
              <Route path="/pass-generated" element={<AuthRoute><PassGeneratedPage /></AuthRoute>} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ChatbotWrapper>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
