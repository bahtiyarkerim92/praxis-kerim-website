"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import de from './locales/de.json';
import bg from './locales/bg.json';
import tr from './locales/tr.json';
import en from './locales/en.json';
import pl from './locales/pl.json';

const translations = { de, bg, tr, en, pl };

export type Lang = 'de' | 'bg' | 'tr' | 'en' | 'pl';

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  lang: 'de',
  setLang: () => {},
  t: (key: string) => key,
});

export function I18nProvider({ children, initialLang }: { children: React.ReactNode; initialLang?: Lang }) {
  const [lang, setLangState] = useState<Lang>(initialLang || 'de');

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', newLang);
      document.cookie = `lang=${newLang}; path=/; max-age=31536000`;
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('lang') as Lang | null;
      if (stored && ['de', 'bg', 'tr', 'en', 'pl'].includes(stored)) {
        setLangState(stored);
      }
    }
  }, []);

  const t = (key: string): string => {
    const value = (translations[lang] as Record<string, string>)[key];
    return value || key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextType {
  return useContext(I18nContext);
}

