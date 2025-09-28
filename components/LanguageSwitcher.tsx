"use client";
// ...existing code...
type LanguageSwitcherProps = {
  size?: "small" | "normal";
};
import React, { useState } from 'react';
import Image from 'next/image';
import { useI18n } from '../src/i18n';

const languages = [
  { code: 'de', flag: '/images/flags/germany.png', alt: 'Deutsch' },
  { code: 'en', flag: '/images/flags/united-kingdom.png', alt: 'English' },
  { code: 'tr', flag: '/images/flags/turkey.png', alt: 'Türkçe' },
  { code: 'pl', flag: '/images/flags/poland.png', alt: 'Polski' },
  { code: 'bg', flag: '/images/flags/bulgaria.png', alt: 'Български' },
];

export default function LanguageSwitcher({ size = "normal" }: LanguageSwitcherProps) {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);

  // Small size for header, normal for elsewhere
  const btnSize = size === "small" ? "w-7 h-7" : "w-8 h-8 sm:w-12 sm:h-12";
  const imgSize = size === "small" ? 28 : 40;

  return (
    <div className="relative">
      <button
        className={`flex items-center justify-center p-0 rounded-full focus:outline-none border-2 border-gray-300 bg-white shadow ${btnSize}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Sprachauswahl öffnen"
      >
        <Image
          src={languages.find((l) => l.code === lang)?.flag || '/images/flags/germany.png'}
          alt="Current language"
          width={imgSize}
          height={imgSize}
          className="rounded-full object-cover w-full h-full"
          priority
        />
      </button>
      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-8 sm:w-10 bg-black rounded-xl border border-gray-700 shadow-2xl z-10 flex flex-col items-center py-1 px-1">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code as 'de' | 'en' | 'tr' | 'pl' | 'bg');
                setOpen(false);
              }}
              className="flex items-center justify-center w-full py-1 sm:py-2"
              aria-label={l.alt}
            >
              <Image src={l.flag} alt={l.alt} width={24} height={24} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-white border-[1px]" priority />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}