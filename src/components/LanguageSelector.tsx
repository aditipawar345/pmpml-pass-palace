
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Language = "English" | "Hindi" | "Marathi";

interface LanguageSelectorProps {
  onLanguageChange: (language: Language) => void;
}

export function LanguageSelector({ onLanguageChange }: LanguageSelectorProps) {
  const [language, setLanguage] = useState<Language>("English");

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    onLanguageChange(newLanguage);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-32">
          {language}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32 bg-white">
        <DropdownMenuItem 
          onClick={() => handleLanguageChange("English")}
          className="flex justify-between items-center"
        >
          English
          {language === "English" && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleLanguageChange("Hindi")}
          className="flex justify-between items-center"
        >
          Hindi
          {language === "Hindi" && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleLanguageChange("Marathi")}
          className="flex justify-between items-center"
        >
          Marathi
          {language === "Marathi" && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
