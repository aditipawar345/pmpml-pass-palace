
// Generate a unique pass number
// Format: PMPML + area code (3 letters) + random number
export function generatePassNumber(area: string = "PUN"): string {
  // Ensure area code is 3 letters only
  const areaCode = area.substring(0, 3).toUpperCase();
  
  // Generate a random 6-digit number
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  
  return `PMPML${areaCode}${randomNum}`;
}

export interface PassInfo {
  passType: "oneday" | "onemonth" | "threemonths";
  userName: string;
  aadharNumber: string;
  address: string;
  date: Date;
  area?: string;
  photoUrl?: string;
  bonafideUrl?: string;
  passNumber?: string;
}

export const PASS_TYPES = {
  oneday: {
    title: "1-Day Pass",
    duration: "24 hours",
    price: 50,
    features: [
      "Unlimited travel for 1 day",
      "Valid on all regular buses",
      "Cost-effective for single day travel",
      "No photo required"
    ]
  },
  onemonth: {
    title: "1-Month Pass",
    duration: "30 days",
    price: 350,
    features: [
      "Unlimited travel for 1 month",
      "Valid on all regular buses",
      "Perfect for daily commuters",
      "Photo ID included"
    ]
  },
  threemonths: {
    title: "3-Month Pass",
    duration: "90 days",
    price: 750,
    features: [
      "Unlimited travel for 3 months",
      "Valid on all regular buses",
      "Best value for regular travelers",
      "Photo ID included",
      "25% savings compared to monthly passes"
    ]
  }
};
