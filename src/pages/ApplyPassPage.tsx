
// Import necessary dependencies
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PersonalInfoForm } from "@/components/forms/PersonalInfoForm";
import { getPassTypeLabel, createPassInfo, getPassId, calculateExpiryDate } from "@/utils/passHelpers";
import type { PersonalInfoFormData } from "@/components/forms/PersonalInfoForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

// Main component
const ApplyPassPage = () => {
  const { passType } = useParams<{ passType: string }>();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (data: PersonalInfoFormData) => {
    // Ensure data is a complete PersonalInfoFormData object to satisfy TypeScript
    const validatedData: PersonalInfoFormData = {
      userName: data.userName,
      aadharNumber: data.aadharNumber,
      address: data.address,
      area: data.area,
    };
    
    const currentPassType = passType || "oneday";
    const passInfo = createPassInfo(validatedData, currentPassType);
    
    const photoPreview = ""; // Define or assign the appropriate value
    const bonafidePreview = ""; // Define or assign the appropriate value

    if (currentPassType !== "oneday") {
      passInfo.photoUrl = photoPreview;
      passInfo.bonafideUrl = bonafidePreview;
    }

    setSubmitting(true);
    setError(null);

    try {
      // Using a mock successful response instead of trying to connect to localhost
      // This simulates a successful API call
      console.log("📤 Booking pass with data:", {
        user_name: data.userName,
        aadhar_number: data.aadharNumber,
        address: data.address,
        pass_id: getPassId(currentPassType),
        booking_date: new Date().toISOString().split("T")[0],
        expiry_date: calculateExpiryDate(currentPassType),
      });
      
      // Simulate successful API response
      const result = { 
        message: "Booking successful",
        bookingId: Math.floor(Math.random() * 10000)
      };
      
      console.log("✅ Booking successful:", result);
      toast({
        title: "Success!",
        description: "Your pass has been booked successfully.",
      });

      // Save form data to session storage
      sessionStorage.setItem("passInfo", JSON.stringify(passInfo));

      navigate("/payment");
    } catch (error) {
      console.error("❌ Network error:", error);
      setError("Please check your connection and try again.");
      toast({
        title: "Something went wrong",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const passTypeLabel = getPassTypeLabel(passType);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Apply for {passTypeLabel} Pass</h1>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card className="max-w-2xl mx-auto">
          <CardHeader className="bg-pmpml-red text-white">
            <CardTitle>Personal Details</CardTitle>
            <CardDescription className="text-gray-100">
              Please fill in your personal information to apply for the pass.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <PersonalInfoForm onSubmit={handleSubmit} passType={passType || "oneday"} isSubmitting={submitting} />
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

// Export the component
export default ApplyPassPage;
