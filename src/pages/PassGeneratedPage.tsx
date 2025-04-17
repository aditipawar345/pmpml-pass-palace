
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PASS_TYPES, PassInfo } from "@/utils/passUtils";
import { AlertCircle, Download, Home, Printer } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatDate } from "date-fns";

export default function PassGeneratedPage() {
  const navigate = useNavigate();
  const [passInfo, setPassInfo] = useState<PassInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve pass information from session storage
    const storedPassInfo = sessionStorage.getItem('passInfo');
    if (storedPassInfo) {
      try {
        const parsedInfo = JSON.parse(storedPassInfo);
        // Convert date string back to Date object
        parsedInfo.date = new Date(parsedInfo.date);
        setPassInfo(parsedInfo);
      } catch (e) {
        setError("Could not retrieve pass information. Please start over.");
      }
    } else {
      setError("No pass information found. Please start over.");
    }
  }, []);

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
  const expiryDate = new Date(passInfo.date);
  if (passInfo.passType === "oneday") {
    expiryDate.setDate(expiryDate.getDate() + 1);
  } else if (passInfo.passType === "onemonth") {
    expiryDate.setMonth(expiryDate.getMonth() + 1);
  } else if (passInfo.passType === "threemonths") {
    expiryDate.setMonth(expiryDate.getMonth() + 3);
  }

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // This is a placeholder for actual download functionality
    alert("In a real application, this would download a PDF of your pass.");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-pmpml-red mb-2">
              Pass Generated Successfully!
            </h1>
            <p className="text-gray-600">
              Your PMPML bus pass has been generated. Please save or print it for your reference.
            </p>
          </div>
          
          {/* Pass Card */}
          <Card className="mb-8 border-2 border-pmpml-red overflow-hidden print:border-2 print:border-black">
            <CardHeader className="bg-pmpml-red text-white py-4 flex flex-row items-center justify-between print:bg-white print:text-black">
              <div className="flex flex-col items-start">
                <CardTitle className="text-2xl font-bold">PMPML</CardTitle>
                <p className="text-sm">Pune Mahanagar Parivahan Mahamandal Ltd.</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">{passTypeInfo.title}</p>
                <p className="text-sm">Pass ID: {passInfo.passNumber}</p>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Photo area for monthly/quarterly passes */}
                {passInfo.passType !== "oneday" && passInfo.photoUrl && (
                  <div className="w-32 h-40 border-2 border-gray-300 overflow-hidden flex-shrink-0">
                    <img 
                      src={passInfo.photoUrl} 
                      alt="User" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                {/* Pass details */}
                <div className="flex-grow space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{passInfo.userName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Aadhar Number</p>
                      <p className="font-medium">XXXX-XXXX-{passInfo.aadharNumber.slice(-4)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Issue Date</p>
                      <p className="font-medium">{formatDate(passInfo.date, 'dd MMM yyyy')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Expiry Date</p>
                      <p className="font-medium">{formatDate(expiryDate, 'dd MMM yyyy')}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">{passInfo.address}</p>
                    </div>
                  </div>
                  
                  {/* Pass validity information */}
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-500 mb-1">Pass Type</p>
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-lg">{passTypeInfo.title}</p>
                      <p className="font-bold text-pmpml-red text-lg">₹{passTypeInfo.price}</p>
                    </div>
                    <p className="text-sm mt-1">
                      Valid for unlimited travel on all PMPML buses for {passTypeInfo.duration}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Footer with terms */}
              <div className="mt-6 pt-4 border-t text-xs text-gray-500">
                <p>This pass is non-transferable and must be shown upon request.</p>
                <p>For any issues, please contact the nearest PMPML office or call 020-XXXXXXXX.</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handlePrint} className="flex-1 bg-gray-800 hover:bg-gray-700">
              <Printer className="mr-2 h-4 w-4" />
              Print Pass
            </Button>
            <Button onClick={handleDownload} className="flex-1 bg-pmpml-red hover:bg-red-700">
              <Download className="mr-2 h-4 w-4" />
              Download Pass
            </Button>
            <Button onClick={() => navigate("/")} variant="outline" className="flex-1">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
