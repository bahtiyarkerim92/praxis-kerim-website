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
        {/* Critical resource hints for ultra-fast LCP */}
        <link rel="dns-prefetch" href="//praxiskerim.de" />
        <link rel="preconnect" href="https://praxiskerim.de" crossOrigin="anonymous" />
        
        {/* Preload critical images with highest priority */}
        <link rel="preload" as="image" href="/images/slider-poster.png" fetchPriority="high" />
        <link rel="preload" as="image" href="/images/slider-poster2.png" fetchPriority="high" />
        <link rel="preload" as="image" href="/images/slider-poster3.png" fetchPriority="high" />
        <link rel="preload" as="image" href="/images/vid4-poster.png" fetchPriority="high" />
        
        {/* Preload Next.js image optimization endpoint */}
        <link rel="preload" as="image" href="/_next/image?url=%2Fimages%2Fslider-poster.png&w=640&q=75" fetchPriority="high" />
        <link rel="preload" as="image" href="/_next/image?url=%2Fimages%2Fslider-poster2.png&w=640&q=75" fetchPriority="high" />
        <link rel="preload" as="image" href="/_next/image?url=%2Fimages%2Fslider-poster3.png&w=640&q=75" fetchPriority="high" />
        
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
