"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Komprimierte Bilder - Next.js optimiert für WebP/AVIF
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
      {/* Next.js Image mit WebP/AVIF Optimierung */}
      {images.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={`Slider ${index + 1} – Hausarztpraxis Offenbach`}
          fill
          className={`object-cover transition-opacity duration-500 ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            // Hardware-beschleunigte Transformationen
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            willChange: 'opacity'
          }}
                 // Next.js Image Optimierungen
                 priority={index === 0} // Erstes Bild mit höchster Priorität
                 quality={70} // Optimiert für WebP/AVIF Kompression
                 sizes="(max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1280px) 1280px, (max-width: 1536px) 1536px, 1920px"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          loading={index === 0 ? "eager" : "lazy"}
          fetchPriority={index === 0 ? "high" : "auto"}
        />
      ))}
    </div>
  );
}
