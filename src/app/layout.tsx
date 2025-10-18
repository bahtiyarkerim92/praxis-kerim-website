import { cookies } from 'next/headers';
import { Metadata, Viewport } from 'next';
import ClientRootLayout from './ClientRootLayout';
import { generatePageMetadata, generateLocalBusinessJsonLd, generateDoctorJsonLd } from '../config/seo';

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
        {/* Aggressive preloading for ultra-fast LCP */}
        <link rel="preload" as="image" href="/images/slider-poster.png" fetchpriority="high" />
        <link rel="preload" as="image" href="/images/slider-poster2.png" fetchpriority="high" />
        <link rel="preload" as="image" href="/images/slider-poster3.png" fetchpriority="high" />
        <link rel="preload" as="image" href="/images/vid4-poster.png" fetchpriority="high" />
        
        {/* DNS prefetch for faster image loading */}
        <link rel="dns-prefetch" href="//praxiskerim.de" />
        <link rel="preconnect" href="https://praxiskerim.de" crossOrigin="anonymous" />
        
        {/* Critical CSS for slider */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .slider-container { 
              contain: layout style paint;
              will-change: transform;
            }
            .slider-image {
              image-rendering: -webkit-optimize-contrast;
              image-rendering: crisp-edges;
              backface-visibility: hidden;
              transform: translateZ(0);
            }
          `
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
        
        <ClientRootLayout initialLang={lang}>{children}</ClientRootLayout>
      </body>
    </html>
  );
}
