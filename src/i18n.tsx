"use client";
import React, { createContext, useContext, useState } from 'react';
import de from './locales/de.json';
import bg from './locales/bg.json';
import tr from './locales/tr.json';
import en from './locales/en.json';
import pl from './locales/pl.json';

const translations = { de, bg, tr, en, pl };


type Lang = 'de' | 'bg' | 'tr' | 'en' | 'pl';
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


export function I18nProvider({ children, initialLang }: { children: React.ReactNode, initialLang?: Lang }) {
  // Initialize from localStorage if available, else from initialLang (SSR cookie), else 'de'
  const getInitialLang = (): Lang => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('lang');
      if (stored && ['de','bg','tr','en','pl'].includes(stored)) return stored as Lang;
    }
    if (initialLang && ['de','bg','tr','en','pl'].includes(initialLang)) return initialLang;
    return 'de';
  };
  const [lang, setLangState] = useState<Lang>(getInitialLang());
  // Persist to localStorage and cookie
  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('lang', newLang);
      document.cookie = `lang=${newLang}; path=/; max-age=31536000`;
    }
  };
  // On mount, sync state with localStorage (for SSR hydration)
  React.useEffect(() => {
    const stored = window.localStorage.getItem('lang');
    if (stored && ['de','bg','tr','en','pl'].includes(stored)) {
      setLangState(stored as Lang);
    }
    // Only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const t = (key: string) => ((translations[lang] as Record<string, string>)[key]) || key;
  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
