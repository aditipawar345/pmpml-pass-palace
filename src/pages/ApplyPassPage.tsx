
// Import necessary dependencies
import React from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PassInfo } from "@/utils/passUtils";
import { useNavigate } from "react-router-dom";

// Add a function to generate pass number
export const generatePassNumber = (prefix: string): string => {
  const randomNum = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  const timestamp = Date.now().toString().slice(-4);
  return `${prefix.toUpperCase()}-${randomNum}-${timestamp}`;
};

// Define the getPassId function
const getPassId = (type: string) => {
  switch (type) {
    case "oneday":
      return 1;
    case "onemonth":
      return 2;
    case "threemonths":
      return 3;
    default:
      return 0;
  }
};

// Define the calculateExpiryDate function
const calculateExpiryDate = (type: string): string => {
  const today = new Date();
  if (type === "oneday") today.setDate(today.getDate() + 1);
  if (type === "onemonth") today.setMonth(today.getMonth() + 1);
  if (type === "threemonths") today.setMonth(today.getMonth() + 3);
  return today.toISOString().split("T")[0];
};

// Main component
const ApplyPassPage = () => {
  const { passType } = useParams<{ passType: string }>();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    const currentPassType = data.passType || passType;
    const passInfo: PassInfo = {
      passType: currentPassType as "oneday" | "onemonth" | "threemonths",
      userName: data.userName,
      aadharNumber: data.aadharNumber,
      address: data.address,
      date: new Date(),
      area: data.area,
      passNumber: generatePassNumber(data.area.substring(0, 3)),
    };

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

        // Save form data to session storage
        sessionStorage.setItem("passInfo", JSON.stringify(passInfo));

        navigate("/payment");
      } else {
        const error = await response.json();
        console.error("❌ Booking failed:", error);
        alert("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("❌ Network error:", error);
      alert("Something went wrong. Please check your connection.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Apply for {passType} Pass</h1>
        {/* Form will be implemented here */}
      </main>
      <Footer />
    </div>
  );
};

// Export both the component and the named export
export default ApplyPassPage;
