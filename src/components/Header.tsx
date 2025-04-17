
import { useState } from "react";
import { LanguageSelector } from "./LanguageSelector";
import { useNavigate } from "react-router-dom";
import { Logo } from "./Logo";

type Language = "English" | "Hindi" | "Marathi";

export function Header() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("English");
  const navigate = useNavigate();

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    // In a real app, you would implement language change logic here
  };

  return (
    <header className="bg-pmpml-red text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
          <Logo />
          <span className="text-xs bg-white text-pmpml-red px-2 py-1 rounded-full">
            Official
          </span>
        </div>
        <LanguageSelector onLanguageChange={handleLanguageChange} />
      </div>
    </header>
  );
}
