// ... your existing imports
import { PassInfo } from "@/utils/passUtils";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Add below utils somewhere near the top
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

const calculateExpiryDate = (type: string): string => {
  const today = new Date();
  if (type === "oneday") today.setDate(today.getDate() + 1);
  if (type === "onemonth") today.setMonth(today.getMonth() + 1);
  if (type === "threemonths") today.setMonth(today.getMonth() + 3);
  return today.toISOString().split("T")[0];
};
// Inside your component:
const navigate = useNavigate();
// Inside your component:
const onSubmit = async (data: any) => {
  const passType = data.passType; // Ensure passType is passed in the data object
  const passInfo: PassInfo = {
    passType: passType as "oneday" | "onemonth" | "threemonths",
    userName: data.userName,
    aadharNumber: data.aadharNumber,
    address: data.address,
    date: new Date(),
    area: data.area,
    passNumber: generatePassNumber(data.area.substring(0, 3)),
  };

  const photoPreview = ""; // Define or assign the appropriate value
  const bonafidePreview = ""; // Define or assign the appropriate value

  if (passType !== "oneday") {
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
        pass_id: getPassId(passType),
        booking_date: new Date().toISOString().split("T")[0],
        expiry_date: calculateExpiryDate(passType),
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
function generatePassNumber(arg0: any): string {
  throw new Error("Function not implemented.");
}

