

"use client";
import Link from "next/link";
import Image from "next/image";
import { useI18n } from '../src/i18n';
import { useEffect, useState } from 'react';

const LANGS = [
  { code: 'de', label: 'DE' },
  { code: 'en', label: 'EN' },
  { code: 'tr', label: 'TR' },
  { code: 'bg', label: 'BG' },
  { code: 'pl', label: 'PL' },
];

import { useRef } from 'react';

function LanguageSwitcher({ currentLang, onChange, isSticky }: { currentLang: string, onChange: (lang: string) => void, isSticky?: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]); // setOpen is stable from useState

  return (
    <div ref={ref} className="relative select-none">
      <button
        className="font-bold text-xs md:text-sm px-2 py-1 text-white bg-transparent hover:text-yellow-400 focus:outline-none cursor-pointer"
        style={{ border: 'none', background: 'none' }}
        onClick={() => setOpen(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {LANGS.find(l => l.code === currentLang)?.label}
      </button>
      {open && (
        <div
          className={`absolute left-1/2 top-full -translate-x-1/2 ${isSticky ? 'bg-black/90' : 'bg-black'} ${open ? 'block' : 'hidden'} rounded-3xl min-w-[100px] z-[120] shadow-2xl px-2 mt-2`}
          style={{ boxShadow: '0 8px 32px 0 rgba(238,193,107,0.25), 0 1.5px 8px 0 rgba(0,0,0,0.25)' }}
        >
          {LANGS.map(lang => (
            <button
              key={lang.code}
              className={`block w-full px-3 py-2 text-white font-bold text-xs md:text-sm rounded-xl transition-colors duration-150 flex justify-center items-center cursor-pointer ${currentLang === lang.code ? (isSticky ? 'bg-black/90 text-yellow-400' : 'bg-black text-yellow-400') : ''}`}
              style={{ background: 'none', border: 'none' }}
              onClick={() => { setOpen(false); onChange(lang.code); }}
              aria-selected={currentLang === lang.code}
              role="option"
            >
              <span className="w-full text-center group-hover:text-black group-hover:bg-[color:rgb(238,193,107)]" style={{background: 'none'}}>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const { t, lang, setLang } = useI18n();
  const [isSticky, setIsSticky] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
  <header className={`sticky top-0 ${isSticky ? 'bg-black/90' : 'bg-black'} shadow-md z-50 w-full max-w-[1200px] mx-auto relative px-2 sm:px-4 ${isSticky ? '' : ''} md:rounded-3xl rounded-none`}>
      <div className="flex items-center justify-between py-2 min-h-[0.4375rem]">
        <Link href="/">
          <Image src="/images/logo.png" alt="Praxis Kerim Logo" width={96} height={96} className="w-16 sm:w-20 md:w-24 h-auto" priority />
        </Link>
        <div className="flex-1 flex justify-center">
          <nav className="space-x-2 sm:space-x-4 md:space-x-6 hidden md:flex">
            <Link href="/" className="text-white text-sm sm:text-base font-medium hover:text-[color:rgb(238,193,107)]">{t('nav.home')}</Link>
            <div className="relative group inline-block">
              <button type="button" className="text-white text-sm sm:text-base font-medium cursor-pointer select-none hover:text-[color:rgb(238,193,107)] bg-transparent border-none outline-none" tabIndex={0} aria-haspopup="true">
                {t('nav.services')}
              </button>
              {/* Buffer area to prevent flicker */}
              <div className="absolute left-0 w-full h-3" style={{top: '100%'}}></div>
              <div
                className={`absolute left-0 mt-2 ${isSticky ? 'bg-black/90' : 'bg-black'} rounded-xl min-w-[140px] sm:min-w-[180px] z-50 hidden group-hover:block group-focus-within:block transition-all duration-200 shadow-2xl`}
                style={{ transitionDelay: '120ms', boxShadow: '0 8px 32px 0 rgba(238,193,107,0.25), 0 1.5px 8px 0 rgba(0,0,0,0.25)' }}
                tabIndex={0}
              >
                <Link href="/allgemeinmedizin" className="block px-2 sm:px-4 py-2 text-white rounded-xl">
                  <span className="transition-colors duration-150 hover:text-yellow-400">{t('allgemeinmedizin')}</span>
                </Link>
                <Link href="/innere-medizin" className="block px-2 sm:px-4 py-2 text-white rounded-xl">
                  <span className="transition-colors duration-150 hover:text-yellow-400">{t('innere_medizin')}</span>
                </Link>
                <Link href="/chirurgie" className="block px-2 sm:px-4 py-2 text-white rounded-xl">
                  <span className="transition-colors duration-150 hover:text-yellow-400">{t('chirurgie')}</span>
                </Link>
                <Link href="/beschneidungen" className="block px-2 sm:px-4 py-2 text-white rounded-xl">
                  <span className="transition-colors duration-150 hover:text-yellow-400">{t('beschneidungen')}</span>
                </Link>
              </div>
            </div>
            <Link href="/ueber-uns" className="text-white text-sm sm:text-base font-medium hover:text-[color:rgb(238,193,107)]">{t('nav.about')}</Link>
            <Link href="/kontakt" className="text-white text-sm sm:text-base font-medium hover:text-[color:rgb(238,193,107)]">{t('nav.contact')}</Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link 
            href="/terminbuchung" 
            className="rounded-xl shadow font-medium ml-2 sm:ml-4 text-xs sm:text-base px-2 sm:px-4 py-2 cursor-pointer hidden md:inline-block bg-[#EEC16B] text-black transition-transform hover:scale-110 hover:shadow-[0_0_20px_#EEC16B]"
            style={{ fontWeight: 500, textAlign: 'center' }}
          >
            {t('nav.appointment')}
          </Link>
          {/* Language switcher right of booking button */}
          <LanguageSwitcher currentLang={lang} onChange={(l) => setLang(l as 'de' | 'en' | 'tr' | 'bg' | 'pl')} isSticky={isSticky} />
          <button className="md:hidden p-2 focus:outline-none" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Open menu">
            <span className="flex flex-col justify-center items-center w-7 h-7">
              <span className="block w-6 h-0.5 bg-white rounded mb-1"></span>
              <span className="block w-6 h-0.5 bg-white rounded mb-1"></span>
              <span className="block w-6 h-0.5 bg-white rounded"></span>
            </span>
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileOpen && (
        <nav className={`flex flex-col gap-2 ${isSticky ? 'bg-black/90' : 'bg-black'} shadow-2xl p-4 absolute top-full left-0 w-full z-50 md:hidden rounded-none`}>
          <Link href="/" className="text-white text-base font-medium hover:text-[color:rgb(238,193,107)]" onClick={() => setMobileOpen(false)}>{t('nav.home')}</Link>
          <span className="text-white text-base font-medium cursor-default select-none">{t('nav.services')}</span>
          <div className="flex flex-col gap-1 pl-2">
            <Link href="/uslugi/allgemeinmedizin" className="block px-2 py-2 text-white rounded-xl" onClick={() => setMobileOpen(false)}>
              <span className="transition-colors duration-150 hover:text-yellow-400">{t('allgemeinmedizin')}</span>
            </Link>
            <Link href="/uslugi/innere-medizin" className="block px-2 py-2 text-white rounded-xl" onClick={() => setMobileOpen(false)}>
              <span className="transition-colors duration-150 hover:text-yellow-400">{t('innere_medizin')}</span>
            </Link>
            <Link href="/uslugi/chirurgie" className="block px-2 py-2 text-white rounded-xl" onClick={() => setMobileOpen(false)}>
              <span className="transition-colors duration-150 hover:text-yellow-400">{t('chirurgie')}</span>
            </Link>
            <Link href="/uslugi/beschneidungen" className="block px-2 py-2 text-white rounded-xl" onClick={() => setMobileOpen(false)}>
              <span className="transition-colors duration-150 hover:text-yellow-400">{t('beschneidungen')}</span>
            </Link>
          </div>
          <Link href="/ueber-uns" className="text-white text-base font-medium hover:text-[color:rgb(238,193,107)]" onClick={() => setMobileOpen(false)}>{t('nav.about')}</Link>
          <Link href="/kontakt" className="text-white text-base font-medium hover:text-[color:rgb(238,193,107)]" onClick={() => setMobileOpen(false)}>{t('nav.contact')}</Link>
          <Link href="/terminbuchung" className="rounded-xl shadow font-medium text-base px-4 py-2 cursor-pointer bg-[color:rgb(238,193,107)] text-white" onClick={() => setMobileOpen(false)}>{t('nav.appointment')}</Link>
        </nav>
      )}
    </header>
  );
}
