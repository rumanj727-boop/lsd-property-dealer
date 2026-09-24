"use client";

import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी (Hindi)" },
  { code: "mr", name: "मराठी (Marathi)" },
];

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState("English");

  useEffect(() => {
    // Add Google Translate Script if not already present
    if (!document.getElementById("google-translate-script")) {
      const addScript = document.createElement("script");
      addScript.id = "google-translate-script";
      addScript.setAttribute(
        "src",
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      );
      document.body.appendChild(addScript);

      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          { 
            pageLanguage: "en", 
            includedLanguages: "en,hi,mr",
            autoDisplay: false
          },
          "google_translate_element"
        );
      };
    }
  }, []);

  const switchLanguage = (langCode: string, langName: string) => {
    setCurrentLang(langName);
    
    // Find the hidden Google Translate select dropdown and trigger a change
    const selectElement = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (selectElement) {
      selectElement.value = langCode;
      // Google translate requires bubbling events to detect the change
      selectElement.dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));
      
      // Sometimes it needs a slight delay and a second event to kick in
      setTimeout(() => {
        selectElement.dispatchEvent(new Event("change", { bubbles: true }));
      }, 100);
    }
  };

  return (
    <div className="relative">
      {/* Hidden Google Translate Element container */}
      <div id="google_translate_element" className="hidden opacity-0 absolute pointer-events-none"></div>

      {/* Our Premium Custom UI */}
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-10 border border-[#C5A880]/30 bg-white/50 backdrop-blur-sm hover:bg-white rounded-full px-4 text-[#1E3A2F] gap-2 outline-none">
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline-block">{currentLang}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 border-[#1E3A2F]/10">
          {languages.map((lang) => (
            <DropdownMenuItem 
              key={lang.code}
              onClick={() => switchLanguage(lang.code, lang.name)}
              className="cursor-pointer hover:bg-[#FBFBF9] hover:text-[#C5A880] focus:bg-[#FBFBF9] focus:text-[#C5A880]"
            >
              {lang.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
