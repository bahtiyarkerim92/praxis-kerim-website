"use client";
import React from "react";
import Image from "next/image";
export default function VideoSlider({ current, onEnded }: { current: number, onEnded: () => void }) {
  const videos = React.useMemo(() => [
    { src: "/videos/vid1_autoplay.mp4" },
    { src: "/videos/vid2_autoplay.mp4" },
    { src: "/videos/vid3_autoplay.mp4" },
  ], []);
  const images = React.useMemo(() => [
    "/images/slider-poster.png",
    "/images/slider-poster2.png",
    "/images/slider-poster3.png",
  ], []);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [canAutoplay, setCanAutoplay] = React.useState<boolean|null>(null);

  // Detect autoplay capability once on mount
  React.useEffect(() => {
    if (canAutoplay !== null) return;
    const testVideo = document.createElement('video');
    testVideo.muted = true;
    testVideo.autoplay = true;
    testVideo.playsInline = true;
    testVideo.src = videos[0].src;
    testVideo.load();
    testVideo.play().then(() => {
      setCanAutoplay(true);
    }).catch(() => {
      setCanAutoplay(false);
        });
      }, [videos, canAutoplay]);

      // Auto-advance images if using image slider
      React.useEffect(() => {
        if (canAutoplay !== false) return;
        const timer = setTimeout(() => {
          onEnded();
        }, 5000); // 5 seconds per image
        return () => clearTimeout(timer);
      }, [canAutoplay, current, onEnded]);

      // Only set up video if autoplay is supported
      React.useEffect(() => {
        if (canAutoplay !== true) return;
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.autoplay = true;
          videoRef.current.playsInline = true;
          videoRef.current.poster = images[current];
          videoRef.current.src = videos[current].src;
          videoRef.current.load();
          videoRef.current.play();
        }
      }, [canAutoplay, current, videos, images]);

      return (
        <div className="w-full h-full relative">
          <div className="w-full h-full overflow-hidden rounded-3xl shadow-2xl relative bg-transparent">
            {canAutoplay === true ? (
              <video
                ref={videoRef}
                className="w-full h-full object-fill"
                autoPlay
                muted
                playsInline
                poster={images[current]}
                onEnded={onEnded}
              />
            ) : canAutoplay === false ? (
              <Image
                src={images[current]}
                alt={`Slider ${current + 1} – Hausarztpraxis Offenbach`}
                width={864}
                height={432}
                className="w-full h-full object-fill rounded-3xl"
                priority={current === 0}
                quality={85}
                sizes="100vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                loading={current === 0 ? "eager" : "lazy"}
              />
            ) : (
              <Image
                src="/images/slider-poster.png"
                alt="Loading slider – Hausarztpraxis Offenbach"
                width={864}
                height={432}
                className="w-full h-full object-fill rounded-3xl"
                priority
                quality={85}
                sizes="100vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                loading="eager"
              />
            )}
          </div>
        </div>
      );
  }