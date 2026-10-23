import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations, Translations } from "../locales/translations";
import { Interview } from "../types";
import { MATRIZ_EVALUACION } from "../config/constants";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: keyof Translations) => string;
  isEn: boolean;
  isEs: boolean;
  getLocalizedLevel: (level: string) => { title: string; short: string; criteria: string; solution: string };
  generateWhatsAppProposal: (client: Interview) => string;
}

const LANGUAGE_STORAGE_KEY = "is_data_solutions_language_pref";

const LanguageContext = createContext<LanguageContextType>({
  language: "es",
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (key) => translations.es[key] || String(key),
  isEn: false,
  isEs: true,
  getLocalizedLevel: () => ({ title: "", short: "", criteria: "", solution: "" }),
  generateWhatsAppProposal: () => ""
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved === "es" || saved === "en") return saved;
      // Default to browser language if English, else Spanish
      const browserLang = navigator.language.toLowerCase();
      return browserLang.startsWith("en") ? "en" : "es";
    } catch {
      return "es";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
      document.documentElement.lang = language;
    } catch (e) {
      console.warn("Could not save language to localStorage", e);
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === "es" ? "en" : "es"));
  };

  const t = (key: keyof Translations): string => {
    const dict = translations[language];
    return dict[key] || translations.es[key] || String(key);
  };

  const getLocalizedLevel = (level: string) => {
    if (level.includes("1") || level.toLowerCase().includes("inicial")) {
      return {
        title: language === "en" ? translations.en.level_1_title : translations.es.level_1_title,
        short: language === "en" ? translations.en.level_1_short : translations.es.level_1_short,
        criteria: language === "en" ? translations.en.level_1_criteria : translations.es.level_1_criteria,
        solution: language === "en" ? translations.en.level_1_solution : translations.es.level_1_solution
      };
    }
    if (level.includes("2") || level.toLowerCase().includes("operativo")) {
      return {
        title: language === "en" ? translations.en.level_2_title : translations.es.level_2_title,
        short: language === "en" ? translations.en.level_2_short : translations.es.level_2_short,
        criteria: language === "en" ? translations.en.level_2_criteria : translations.es.level_2_criteria,
        solution: language === "en" ? translations.en.level_2_solution : translations.es.level_2_solution
      };
    }
    return {
      title: language === "en" ? translations.en.level_3_title : translations.es.level_3_title,
      short: language === "en" ? translations.en.level_3_short : translations.es.level_3_short,
      criteria: language === "en" ? translations.en.level_3_criteria : translations.es.level_3_criteria,
      solution: language === "en" ? translations.en.level_3_solution : translations.es.level_3_solution
    };
  };

  const generateWhatsAppProposal = (client: Interview): string => {
    const localized = getLocalizedLevel(client.nivel_madurez);
    const matriz = MATRIZ_EVALUACION[client.nivel_madurez] || MATRIZ_EVALUACION["Nivel 1: Inicial / Disperso"];
    const empresa = client.empresa;
    const responsable = client.responsable_nombre;
    const rol = client.responsable_rol;
    const sector =
      client.sector === "Otro" && client.sector_otro
        ? `Otro (${client.sector_otro})`
        : client.sector;
    const score = client.score_global;
    const procesoPrio =
      client.proceso_prioritario === "Otro" && client.proceso_prioritario_otro
        ? client.proceso_prioritario_otro
        : client.proceso_prioritario;
    const valorEsp = client.valor_esperado;
    const consultor = client.entrevistador || (language === "en" ? "BI Consultant" : "Consultor BI");

    const pasosEmoji = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"];
    const fasesTexto = matriz.prioridades_clave
      .map((p, i) => `${pasosEmoji[i] || "✅"} *${language === "en" ? `Phase ${i + 1}` : `Fase ${i + 1}`}:* ${p}`)
      .join("\n");

    if (language === "en") {
      return `🚀 *BUSINESS INTELLIGENCE IMPLEMENTATION PROPOSAL*
✨ *I+S DATA SOLUTIONS* — _Information + Solutions_
_Data Intelligence for Strategic Decisions_

Hello *${responsable}* 👋, here is the executive summary and custom work proposal crafted for *${empresa}* following our initial diagnostic assessment:

📋 *DIAGNOSTIC FACT SHEET*
• 🏢 *Company:* ${empresa}
• 👤 *Point of Contact:* ${responsable}${rol ? ` (${rol})` : ""}
• 🏭 *Industry Sector:* ${sector}
• 📊 *Maturity Level:* *${localized.title}*
• 🎯 *Overall Score:* *${score}/100 pts*
• 👨‍💼 *Lead Consultant:* ${consultor}

━━━━━━━━━━━━━━━━━━━━

🎯 *1. FOCUS & PRIORITY PROCESS*
Implementation of an executive dashboard and analytics system focused on:
👉 *${procesoPrio}*

💡 *2. RECOMMENDED TECHNICAL SOLUTION*
${localized.solution}

📈 *3. EXPECTED BUSINESS IMPACT*
✅ *${valorEsp}*

🛠️ *4. ROADMAP (ACTION PLAN)*
${fasesTexto}

━━━━━━━━━━━━━━━━━━━━

💬 _"Real business value does not lie in accumulating data, but in using it to make better decisions."_

🤝 *Next Step:* We can schedule a brief 20-minute meeting to review the dashboard architecture and kick off Phase 1. Let us know what time works best for you!`;
    }

    return `🚀 *PROPUESTA DE IMPLEMENTACIÓN DE BUSINESS INTELLIGENCE*
✨ *I+S DATA SOLUTIONS* — _Information + Solutions_
_Inteligencia de Datos para Decisiones Estratégicas_

Hola *${responsable}* 👋, te compartimos el resumen ejecutivo y la propuesta de trabajo diseñada a medida para *${empresa}* a partir de nuestro relevamiento inicial:

📋 *FICHA DE DIAGNÓSTICO*
• 🏢 *Empresa:* ${empresa}
• 👤 *Referente:* ${responsable}${rol ? ` (${rol})` : ""}
• 🏭 *Sector:* ${sector}
• 📊 *Nivel de Madurez:* *${client.nivel_madurez}*
• 🎯 *Score Global:* *${score}/100 pts*
• 👨‍💼 *Consultor a cargo:* ${consultor}

━━━━━━━━━━━━━━━━━━━━

🎯 *1. ENFOQUE Y PROCESO PRIORITARIO*
Implementación de un sistema de tableros de control y analítica focalizado en:
👉 *${procesoPrio}*

💡 *2. SOLUCIÓN TÉCNICA RECOMENDADA*
${matriz.solucion}

📈 *3. IMPACTO Y VALOR ESPERADO*
✅ *${valorEsp}*

🛠️ *4. HOJA DE RUTA (PLAN DE ACCIÓN)*
${fasesTexto}

━━━━━━━━━━━━━━━━━━━━

💬 _"El valor real no está en acumular datos, sino en saber utilizarlos para decidir mejor."_

🤝 *Próximo paso:* Podemos agendar una breve llamada de 20 minutos para definir los accesos a datos y comenzar con la Fase 1. ¡Quedamos a tu disposición!`;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        isEn: language === "en",
        isEs: language === "es",
        getLocalizedLevel,
        generateWhatsAppProposal
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
