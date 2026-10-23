import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  className?: string;
  showIcon?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = "",
  showIcon = true
}) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={`inline-flex items-center gap-1.5 p-1 bg-white/90 border border-[#E4ECF2] rounded-xl shadow-2xs ${className}`}
      title={language === "es" ? "Cambiar idioma (Español / Inglés)" : "Change language (Spanish / English)"}
    >
      {showIcon && (
        <Globe className="w-3.5 h-3.5 text-[#3B8AC4] ml-1 shrink-0" aria-hidden="true" />
      )}
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => setLanguage("es")}
          className={`px-2 py-1 text-[11px] font-semibold rounded-lg transition-all cursor-pointer font-['Outfit'] ${
            language === "es"
              ? "bg-[#3B8AC4] text-white shadow-xs"
              : "text-slate-500 hover:text-[#1E252D] hover:bg-slate-100"
          }`}
          aria-label="Español"
        >
          ES
        </button>
        <button
          type="button"
          onClick={() => setLanguage("en")}
          className={`px-2 py-1 text-[11px] font-semibold rounded-lg transition-all cursor-pointer font-['Outfit'] ${
            language === "en"
              ? "bg-[#3B8AC4] text-white shadow-xs"
              : "text-slate-500 hover:text-[#1E252D] hover:bg-slate-100"
          }`}
          aria-label="English"
        >
          EN
        </button>
      </div>
    </div>
  );
};
