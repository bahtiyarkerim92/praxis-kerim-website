
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
  const [mounted, setMounted] = useState(false);

  const [headerHeight, setHeaderHeight] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Header-Element suchen (angenommen: <header> oder .header)
    function updateHeaderHeight() {
      const header = document.querySelector('header, .header') as HTMLElement | null;
      setHeaderHeight(header ? header.offsetHeight : 0);
    }
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, [mounted]);
  
  useEffect(() => {
    if (!mounted) return;
    
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [mounted]);
  
  useEffect(() => {
    if (!mounted) return;
    
    setVisible(false);
    const timeout = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timeout);
  }, [name, mounted]);
  
  if (!name || !mounted) return null;

  // Schwelle: Nach x Pixeln (z.B. halbe Viewporthöhe) beginnt der Übergang zur Screenmitte
  // Bis headerHeight gescrollt ist, bewegt sich der Indicator pixelgenau mit, danach bleibt er fixiert
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  const top = headerHeight + (viewportHeight - headerHeight) / 2 - Math.min(scrollY, headerHeight);
  return (
    <div
      className={`hidden md:flex fixed right-0 z-[100] flex-col items-end pointer-events-none select-none transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
      style={{ top: `${top}px`, transform: 'translateY(-50%)', right: '18px' }}
    >
      <div className="flex flex-col items-center">
        <span
          className="text-[#EEC16B] font-extrabold text-[0.85rem] md:text-[1rem] tracking-[0.25em] opacity-90"
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            fontFamily: 'Montserrat, Geist, Arial, sans-serif',
            letterSpacing: '0.25em',
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
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {name.toUpperCase()}
        </span>
      </div>
    </div>
  );
}
