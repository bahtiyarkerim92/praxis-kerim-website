"use client";

import { useState, useEffect } from "react";

// Komprimierte Bilder - direkt geladen für maximale Geschwindigkeit
const images = [
  "/images/slider-poster.png",    // 335KB (komprimiert)
  "/images/slider-poster2.png",   // 233KB (komprimiert) 
  "/images/slider-poster3.png",   // 290KB (komprimiert)
];

export default function MegaFastSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000); // 4 Sekunden pro Bild
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full aspect-video bg-black relative overflow-hidden mega-fast-slider">
      {/* Alle Bilder werden sofort geladen - kein Lazy Loading */}
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={`Slider ${index + 1} – Hausarztpraxis Offenbach`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            // Hardware-beschleunigte Transformationen
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            willChange: 'opacity'
          }}
          // Kritische Performance-Optimierungen
          loading="eager"
          fetchPriority="high"
          decoding="sync"
        />
      ))}
    </div>
  );
}
