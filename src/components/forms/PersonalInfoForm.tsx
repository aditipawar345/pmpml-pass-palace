
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

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

export type PersonalInfoFormData = z.infer<typeof formSchema>;

interface PersonalInfoFormProps {
  onSubmit: (data: PersonalInfoFormData) => void;
  passType: string;
  isSubmitting?: boolean;
}

export const PersonalInfoForm = ({ onSubmit, passType, isSubmitting = false }: PersonalInfoFormProps) => {
  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      aadharNumber: "",
      address: "",
      area: "Pune City",
    },
  });

  return (
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
                    e.currentTarget.value = e.currentTarget.value.slice(0, 12);
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
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Continue to Payment"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
