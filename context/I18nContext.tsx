import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { translations } from '../locales';

type Language = 'en' | 'tr';

interface I18nContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof typeof translations['en'], replacements?: { [key: string]: string | number }) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = useCallback((key: keyof typeof translations['en'], replacements?: { [key: string]: string | number }): string => {
    let translation = translations[language][key] || translations['en'][key];

    if (replacements) {
      Object.keys(replacements).forEach(rKey => {
        translation = translation.replace(new RegExp(`\\{${rKey}\\}`, 'g'), String(replacements[rKey]));
      });
    }

    return translation;
  }, [language]);

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};