import { cookies } from 'next/headers';
import { Metadata, Viewport } from 'next';
import ClientRootLayout from './ClientRootLayout';
import { generatePageMetadata, generateLocalBusinessJsonLd, generateDoctorJsonLd } from '../config/seo';
import PerformanceMonitor from '../components/PerformanceMonitor';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = (cookieStore.get('lang')?.value || 'de') as 'de' | 'bg' | 'tr' | 'en' | 'pl';
  
  const metadata = generatePageMetadata('home', lang);
  
  return {
    ...metadata,
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon.svg', type: 'image/svg+xml' },
      ],
      apple: '/apple-touch-icon.png',
    },
    manifest: '/manifest.json',
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#000000',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const lang = (cookieStore.get('lang')?.value || 'de') as 'de' | 'bg' | 'tr' | 'en' | 'pl';
  
  const localBusinessJsonLd = generateLocalBusinessJsonLd(lang);
  const doctorJsonLd = generateDoctorJsonLd();
  
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        {/* Critical resource hints for ultra-fast LCP */}
        <link rel="dns-prefetch" href="//praxiskerim.de" />
        <link rel="preconnect" href="https://praxiskerim.de" crossOrigin="anonymous" />
        
               {/* Preload ALL slider images for instant LCP - Ultra-fast loading */}
               <link rel="preload" as="image" href={process.env.NODE_ENV === 'development' ? "/images/slider-poster.png" : "/images/slider-poster.avif"} fetchPriority="high" />
               <link rel="preload" as="image" href={process.env.NODE_ENV === 'development' ? "/images/slider-poster2.png" : "/images/slider-poster2.avif"} fetchPriority="high" />
               <link rel="preload" as="image" href={process.env.NODE_ENV === 'development' ? "/images/slider-poster3.png" : "/images/slider-poster3.avif"} fetchPriority="high" />
               <link rel="preload" as="image" href={process.env.NODE_ENV === 'development' ? "/images/vid4-poster.png" : "/images/vid4-poster.avif"} fetchPriority="high" />
               <link rel="preload" as="image" href={process.env.NODE_ENV === 'development' ? "/images/kontakt.png" : "/images/kontakt.avif"} fetchPriority="high" />
        
               {/* Preload Next.js image optimization endpoint - AVIF optimized */}
               <link rel="preload" as="image" href="/_next/image?url=%2Fimages%2Fslider-poster.avif&w=640&q=70" fetchPriority="high" />
               <link rel="preload" as="image" href="/_next/image?url=%2Fimages%2Fslider-poster.avif&w=768&q=70" fetchPriority="high" />
               <link rel="preload" as="image" href="/_next/image?url=%2Fimages%2Fslider-poster.avif&w=1024&q=70" fetchPriority="high" />
               <link rel="preload" as="image" href="/_next/image?url=%2Fimages%2Fslider-poster.avif&w=1280&q=70" fetchPriority="high" />
               <link rel="preload" as="image" href="/_next/image?url=%2Fimages%2Fslider-poster.avif&w=1536&q=70" fetchPriority="high" />
               <link rel="preload" as="image" href="/_next/image?url=%2Fimages%2Fslider-poster.avif&w=1920&q=70" fetchPriority="high" />
        
        {/* Critical CSS for mega-fast slider */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Ultra-fast slider optimizations */
            .mega-fast-slider {
              contain: layout style paint;
              transform: translateZ(0);
              will-change: transform;
              backface-visibility: hidden;
            }
            .mega-fast-slider img {
              transform: translateZ(0);
              backface-visibility: hidden;
              will-change: opacity;
              image-rendering: optimizeSpeed;
              image-rendering: -webkit-optimize-contrast;
            }
            /* Prevent layout shifts */
            .mega-fast-slider {
              aspect-ratio: 16/9;
              width: 100%;
            }
          `
        }} />
        
        {/* Service Worker Registration für Ultra-Fast Caching */}
        <script dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                  .then(function(registration) {
                    console.log('🚀 Service Worker registriert:', registration.scope);
                  })
                  .catch(function(error) {
                    console.log('❌ Service Worker Registrierung fehlgeschlagen:', error);
                  });
              });
            }
          `,
        }} />
      </head>
      <body suppressHydrationWarning>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(doctorJsonLd) }}
        />
        <PerformanceMonitor />
        <ClientRootLayout initialLang={lang}>{children}</ClientRootLayout>
      </body>
    </html>
  );
}
