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


export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('de');
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
