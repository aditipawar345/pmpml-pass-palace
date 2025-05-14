
import { PassInfo } from "./passUtils";

// Generate a unique pass number
export const generatePassNumber = (prefix: string): string => {
  const randomNum = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  const timestamp = Date.now().toString().slice(-4);
  return `PMPML${prefix.toUpperCase()}-${randomNum}-${timestamp}`;
};

// Define the getPassId function
export const getPassId = (type: string) => {
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
export const calculateExpiryDate = (type: string): string => {
  const today = new Date();
  if (type === "oneday") today.setDate(today.getDate() + 1);
  if (type === "onemonth") today.setMonth(today.getMonth() + 1);
  if (type === "threemonths") today.setMonth(today.getMonth() + 3);
  return today.toISOString().split("T")[0];
};

// Get formatted pass type label
export const getPassTypeLabel = (passType: string | undefined): string => {
  return passType === "oneday" ? "One Day" : 
         passType === "onemonth" ? "One Month" : 
         passType === "threemonths" ? "Three Months" : 
         "Pass";
};

// Import the correct type from PersonalInfoForm
import type { PersonalInfoFormData } from "@/components/forms/PersonalInfoForm";

export const createPassInfo = (data: PersonalInfoFormData, passType: string): PassInfo => {
  const currentPassType = passType || "oneday";
  return {
    passType: currentPassType as "oneday" | "onemonth" | "threemonths",
    userName: data.userName,
    aadharNumber: data.aadharNumber,
    address: data.address,
    date: new Date(),
    area: data.area,
    passNumber: generatePassNumber(data.area.substring(0, 3)),
  };
};
