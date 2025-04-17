
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface PassCardProps {
  title: string;
  duration: string;
  price: number;
  features: string[];
  type: "oneday" | "onemonth" | "threemonths";
}

export function PassCard({ title, duration, price, features, type }: PassCardProps) {
  const navigate = useNavigate();

  const handleApply = () => {
    navigate(`/apply/${type}`);
  };

  return (
    <Card className="w-full border-2 hover:border-pmpml-red transition-all duration-300 hover:shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription>Valid for {duration}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-4">
          <span className="text-3xl font-bold">₹{price}</span>
        </div>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <span className="mr-2 text-pmpml-red">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleApply} 
          className="w-full bg-pmpml-red hover:bg-red-700 text-white"
        >
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
}
