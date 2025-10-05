import Image from "next/image";
import { useState, useEffect } from "react";

const images = [
  "/images/slider-poster.png",
  "/images/slider-poster2.png",
  "/images/slider-poster3.png"
];

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full aspect-video bg-black flex items-center justify-center">
      <div className="relative w-full h-0" style={{ paddingBottom: "56.25%" }}>
        <Image
          src={images[current]}
          alt={`Slider ${current + 1} – Hausarztpraxis Offenbach`}
          fill
          className="object-cover transition-all duration-700"
          priority
        />
      </div>
    </div>
  );
}
