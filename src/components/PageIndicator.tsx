
"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useI18n } from '../i18n';
// Headerhöhe dynamisch bestimmen



const PAGE_KEYS: Record<string, string> = {
  "/": "pageindicator.home",
  "/allgemeinmedizin": "pageindicator.allgemeinmedizin",
  "/innere-medizin": "pageindicator.innere_medizin",
  "/chirurgie": "pageindicator.chirurgie",
  "/beschneidungen": "pageindicator.beschneidungen",
  "/ueber-uns": "pageindicator.ueber_uns",
  "/kontakt": "pageindicator.kontakt",
  "/termin-buchen": "pageindicator.termin_buchen",
};

export default function PageIndicator() {
  const { t } = useI18n();
  const pathname = usePathname();
  // Fallback: handle trailing slashes and dynamic routes
  const cleanPath = pathname?.replace(/\/$/, "");
  const key = PAGE_KEYS[cleanPath || "/"];
  const name = key ? t(key) : "";
  const [visible, setVisible] = useState(false);

  const [headerHeight, setHeaderHeight] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Header-Element suchen (angenommen: <header> oder .header)
    function updateHeaderHeight() {
      const header = document.querySelector('header, .header') as HTMLElement | null;
      setHeaderHeight(header ? header.offsetHeight : 0);
    }
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    setVisible(false);
    const timeout = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timeout);
  }, [name]);
  if (!name) return null;

  // Schwelle: Nach x Pixeln (z.B. halbe Viewporthöhe) beginnt der Übergang zur Screenmitte
  // Bis headerHeight gescrollt ist, bewegt sich der Indicator pixelgenau mit, danach bleibt er fixiert
  const isClient = typeof window !== 'undefined';
  const top = isClient
    ? headerHeight + (window.innerHeight - headerHeight) / 2 - Math.min(scrollY, headerHeight)
    : 0;
  // Hydration-Mismatch vermeiden: Erst rendern, wenn window verfügbar (Client), sonst hidden
  if (!isClient) {
    return null;
  }
  return (
    <div
      className={`fixed right-0 z-[100] flex flex-col items-end pointer-events-none select-none transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
      style={{ top: `${top}px`, transform: 'translateY(-50%)', right: '18px' }}
    >
      <div className="flex flex-col items-center">
        {/* Linie oben */}
        <span
          aria-hidden
          className="block h-16 md:h-24 w-[2px] bg-gradient-to-b from-[#EEC16B] via-[#EEC16B40] to-transparent opacity-80"
        />
        <span
          className="text-[#EEC16B] font-extrabold text-[1.1rem] md:text-[1.3rem] tracking-[0.35em] opacity-90"
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            fontFamily: 'Montserrat, Geist, Arial, sans-serif',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            background: 'none',
            borderRadius: 0,
            boxShadow: 'none',
            padding: 0,
            border: 'none',
            marginRight: 0,
            userSelect: 'none',
            transition: 'text-shadow 0.4s cubic-bezier(.4,2,.6,1), color 0.3s',
            textShadow: '0 0 7px #EEC16B60, 0 0 1px #fff',
          }}
        >
          {name.toUpperCase()}
        </span>
        {/* Linie unten */}
        <span
          aria-hidden
          className="block h-16 md:h-24 w-[2px] bg-gradient-to-t from-[#EEC16B] via-[#EEC16B40] to-transparent opacity-80"
        />
      </div>
    </div>
  );
}
