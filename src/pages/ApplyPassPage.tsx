
// Import necessary dependencies
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PassInfo } from "@/utils/passUtils";
import { toast } from "@/hooks/use-toast";

// UI components
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

// Define form schema
const formSchema = z.object({
  userName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  aadharNumber: z.string().length(12, {
    message: "Aadhar number must be exactly 12 digits.",
  }),
  address: z.string().min(5, {
    message: "Please enter a valid address.",
  }),
  area: z.string().min(2, {
    message: "Please select an area.",
  }),
});

// Main component
const ApplyPassPage = () => {
  const { passType } = useParams<{ passType: string }>();
  const navigate = useNavigate();
  
  // Define form with validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      aadharNumber: "",
      address: "",
      area: "Pune City",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const currentPassType = passType || "oneday";
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

  const passTypeLabel = passType === "oneday" ? "One Day" : 
                       passType === "onemonth" ? "One Month" : 
                       passType === "threemonths" ? "Three Months" : 
                       "Pass";

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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="userName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="aadharNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aadhar Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="12 digit Aadhar number" 
                          {...field} 
                          maxLength={12}
                          type="number"
                          onInput={(e) => {
                            e.currentTarget.value = e.currentTarget.value.slice(0, 12)
                          }}
                        />
                      </FormControl>
                      <FormDescription>Your 12-digit Aadhar number</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Residential Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="area"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Area</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your area" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Pune City">Pune City</SelectItem>
                          <SelectItem value="Pimpri-Chinchwad">Pimpri-Chinchwad</SelectItem>
                          <SelectItem value="Kothrud">Kothrud</SelectItem>
                          <SelectItem value="Hadapsar">Hadapsar</SelectItem>
                          <SelectItem value="Hinjewadi">Hinjewadi</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {passType !== "oneday" && (
                  <div className="space-y-4">
                    <div>
                      <FormLabel htmlFor="photo">Upload Photo</FormLabel>
                      <div className="mt-1">
                        <Input 
                          id="photo" 
                          type="file" 
                          accept="image/*" 
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Passport size photo (JPG, PNG)
                      </p>
                    </div>
                    
                    <div>
                      <FormLabel htmlFor="bonafide">Bonafide Certificate</FormLabel>
                      <div className="mt-1">
                        <Input 
                          id="bonafide" 
                          type="file" 
                          accept=".pdf,image/*" 
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Only for student passes (PDF, JPG, PNG)
                      </p>
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-pmpml-red hover:bg-red-700"
                  >
                    Continue to Payment
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

// Export the component
export default ApplyPassPage;
