
// Import necessary dependencies
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PersonalInfoForm } from "@/components/forms/PersonalInfoForm";
import { getPassTypeLabel, createPassInfo, getPassId, calculateExpiryDate } from "@/utils/passHelpers";
import type { PersonalInfoFormData } from "@/components/forms/PersonalInfoForm";

// Main component
const ApplyPassPage = () => {
  const { passType } = useParams<{ passType: string }>();
  const navigate = useNavigate();
  
  const handleSubmit = async (data: PersonalInfoFormData) => {
    const currentPassType = passType || "oneday";
    const passInfo = createPassInfo(data, currentPassType);
    
    const photoPreview = ""; // Define or assign the appropriate value
    const bonafidePreview = ""; // Define or assign the appropriate value

    if (currentPassType !== "oneday") {
      passInfo.photoUrl = photoPreview;
      passInfo.bonafideUrl = bonafidePreview;
    }

    try {
      const response = await fetch("http://localhost:5000/book-pass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_name: data.userName,
          aadhar_number: data.aadharNumber,
          address: data.address,
          pass_id: getPassId(currentPassType),
          booking_date: new Date().toISOString().split("T")[0],
          expiry_date: calculateExpiryDate(currentPassType),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("✅ Booking successful:", result);
        toast({
          title: "Success!",
          description: "Your pass has been booked successfully.",
        });

        // Save form data to session storage
        sessionStorage.setItem("passInfo", JSON.stringify(passInfo));

        navigate("/payment");
      } else {
        const error = await response.json();
        console.error("❌ Booking failed:", error);
        toast({
          title: "Booking failed",
          description: "Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("❌ Network error:", error);
      toast({
        title: "Something went wrong",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    }
  };

  const passTypeLabel = getPassTypeLabel(passType);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Apply for {passTypeLabel} Pass</h1>

        <Card className="max-w-2xl mx-auto">
          <CardHeader className="bg-pmpml-red text-white">
            <CardTitle>Personal Details</CardTitle>
            <CardDescription className="text-gray-100">
              Please fill in your personal information to apply for the pass.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <PersonalInfoForm onSubmit={handleSubmit} passType={passType || "oneday"} />
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

// Export the component
export default ApplyPassPage;
