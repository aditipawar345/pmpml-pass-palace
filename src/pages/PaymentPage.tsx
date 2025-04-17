
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { PASS_TYPES, PassInfo } from "@/utils/passUtils";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function PaymentPage() {
  const navigate = useNavigate();
  const [passInfo, setPassInfo] = useState<PassInfo | null>(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve pass information from session storage
    const storedPassInfo = sessionStorage.getItem('passInfo');
    if (storedPassInfo) {
      try {
        setPassInfo(JSON.parse(storedPassInfo));
      } catch (e) {
        setError("Could not retrieve pass information. Please start over.");
      }
    } else {
      setError("No pass information found. Please start over.");
    }
  }, []);

  const handlePaymentComplete = () => {
    setPaymentProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentProcessing(false);
      navigate("/pass-generated");
    }, 2000);
  };

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Alert variant="destructive" className="max-w-md mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <div className="text-center mt-6">
            <Button onClick={() => navigate("/select-pass")}>
              Return to pass selection
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!passInfo) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-36 bg-gray-200 rounded mb-4"></div>
            <div className="h-6 w-64 bg-gray-200 rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const passTypeInfo = PASS_TYPES[passInfo.passType];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">Payment</h1>
          <p className="text-center text-gray-600 mb-8">
            Complete your payment to generate your pass
          </p>
          
          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Pass Type:</span>
              <span className="font-medium">{passTypeInfo.title}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Duration:</span>
              <span className="font-medium">{passTypeInfo.duration}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Applicant:</span>
              <span className="font-medium">{passInfo.userName}</span>
            </div>
            <div className="flex justify-between mb-4 pb-4 border-b">
              <span>Pass Number:</span>
              <span className="font-medium">{passInfo.passNumber}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total Amount:</span>
              <span className="text-pmpml-red">₹{passTypeInfo.price}</span>
            </div>
          </div>
          
          {/* QR Code for Payment */}
          <div className="bg-white border rounded-lg p-6 mb-6 text-center">
            <h2 className="text-lg font-bold mb-4">Scan QR Code to Pay</h2>
            <div className="mx-auto mb-4 w-48 h-48 bg-white border relative">
              {/* Simple QR Code Representation */}
              <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                <rect x="10" y="10" width="80" height="80" fill="none" stroke="black" strokeWidth="1" />
                <g fill="black">
                  {/* QR code pattern - just a simple representation */}
                  <rect x="20" y="20" width="20" height="20" />
                  <rect x="60" y="20" width="20" height="20" />
                  <rect x="20" y="60" width="20" height="20" />
                  <rect x="40" y="40" width="20" height="20" />
                  <rect x="70" y="50" width="5" height="5" />
                  <rect x="50" y="70" width="5" height="5" />
                  <rect x="60" y="60" width="10" height="10" />
                  <rect x="30" y="45" width="5" height="5" />
                  <rect x="45" y="30" width="5" height="5" />
                  <rect x="25" y="50" width="5" height="5" />
                </g>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white px-2 py-1">
                  <span className="text-pmpml-red font-bold">PMPML</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Scan using any UPI app to make payment
            </p>
            <p className="text-sm font-semibold mb-4">
              Amount: ₹{passTypeInfo.price}
            </p>
            
            {/* Simulate Payment Button (for demo) */}
            <Button
              onClick={handlePaymentComplete}
              disabled={paymentProcessing}
              className="w-full bg-pmpml-red hover:bg-red-700 disabled:opacity-50"
            >
              {paymentProcessing ? "Processing..." : "Simulate Payment (Demo)"}
            </Button>
          </div>
          
          <p className="text-xs text-center text-gray-500">
            This is a demo payment page. No actual payment will be processed.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
