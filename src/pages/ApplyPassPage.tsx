
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertCircle, Upload } from "lucide-react";
import { PASS_TYPES, PassInfo, generatePassNumber } from "@/utils/passUtils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Base schema for all pass types
const baseSchema = z.object({
  userName: z.string().min(3, "Name must be at least 3 characters"),
  aadharNumber: z.string().length(12, "Aadhar number must be 12 digits").regex(/^\d+$/, "Aadhar must contain only numbers"),
  address: z.string().min(10, "Please enter your full address"),
  area: z.string().min(2, "Area is required"),
});

// Extended schema for monthly and quarterly passes
const extendedSchema = baseSchema.extend({
  photo: z.instanceof(FileList).refine(files => files.length > 0, "Photo is required"),
  bonafide: z.instanceof(FileList).refine(files => files.length > 0, "School/College bonafide is required"),
});

export default function ApplyPassPage() {
  const { passType } = useParams<{ passType: string }>();
  const navigate = useNavigate();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [bonafidePreview, setBonafidePreview] = useState<string | null>(null);

  // Validate that pass type is valid
  if (!passType || !["oneday", "onemonth", "threemonths"].includes(passType)) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Alert variant="destructive" className="max-w-md mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Invalid pass type. Please select a valid pass.
            </AlertDescription>
          </Alert>
          <div className="text-center mt-6">
            <Button onClick={() => navigate("/select-pass")}>
              Go back to pass selection
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Choose the correct schema based on pass type
  const formSchema = passType === "oneday" ? baseSchema : extendedSchema;
  const passTypeInfo = PASS_TYPES[passType as keyof typeof PASS_TYPES];

  // Set up form with validation
  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      aadharNumber: "",
      address: "",
      area: "Pune",
    },
  });

  // Handle file changes and preview
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBonafideChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBonafidePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Form submission handler
  const onSubmit = (data: any) => {
    // Create the pass information object
    const passInfo: PassInfo = {
      passType: passType as "oneday" | "onemonth" | "threemonths",
      userName: data.userName,
      aadharNumber: data.aadharNumber,
      address: data.address,
      date: new Date(),
      area: data.area,
      passNumber: generatePassNumber(data.area.substring(0, 3))
    };

    // Add photo and bonafide for monthly and quarterly passes
    if (passType !== "oneday") {
      passInfo.photoUrl = photoPreview;
      passInfo.bonafideUrl = bonafidePreview;
    }

    // Save pass info to session storage to retrieve on payment and pass pages
    sessionStorage.setItem('passInfo', JSON.stringify(passInfo));
    
    // Navigate to payment page
    navigate("/payment");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">
            Apply for {passTypeInfo.title}
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Fill in your details to proceed with the application
          </p>

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
                    <FormLabel>Aadhar Card Number</FormLabel>
                    <FormControl>
                      <Input placeholder="12-digit Aadhar number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter your 12-digit Aadhar number without spaces
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter your full address" {...field} />
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
                    <FormLabel>Area/City</FormLabel>
                    <FormControl>
                      <Input placeholder="Your area or city" {...field} />
                    </FormControl>
                    <FormDescription>
                      This will be used in your pass number
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Additional fields for monthly and quarterly passes */}
              {passType !== "oneday" && (
                <>
                  <div className="space-y-3">
                    <Label htmlFor="photo">Upload Photo (Passport Size)</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        id="photo"
                        type="file"
                        accept="image/*"
                        {...form.register("photo")}
                        onChange={handlePhotoChange}
                        className="flex-1"
                      />
                      {photoPreview && (
                        <div className="h-20 w-20 border rounded overflow-hidden">
                          <img
                            src={photoPreview}
                            alt="Preview"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                    {form.formState.errors.photo && (
                      <p className="text-sm font-medium text-destructive">
                        {form.formState.errors.photo.message?.toString()}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="bonafide">Upload School/College Bonafide</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        id="bonafide"
                        type="file"
                        accept="image/*,.pdf"
                        {...form.register("bonafide")}
                        onChange={handleBonafideChange}
                        className="flex-1"
                      />
                      {bonafidePreview && (
                        <div className="h-10 w-10 border rounded overflow-hidden flex items-center justify-center bg-gray-100">
                          <Upload size={24} className="text-gray-500" />
                        </div>
                      )}
                    </div>
                    {form.formState.errors.bonafide && (
                      <p className="text-sm font-medium text-destructive">
                        {form.formState.errors.bonafide.message?.toString()}
                      </p>
                    )}
                  </div>
                </>
              )}

              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-pmpml-red hover:bg-red-700"
                >
                  Proceed to Payment
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
