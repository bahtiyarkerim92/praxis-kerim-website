import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impressum - Praxis Dr. Kerim | Hausarzt Offenbach',
  description: 'Impressum der Praxis Dr. Kerim in Offenbach am Main. Kontaktdaten, rechtliche Angaben und Verantwortlichkeiten der Hausarztpraxis.',
  keywords: 'Impressum, Praxis Dr. Kerim, Hausarzt Offenbach, Kontakt, rechtliche Angaben, Arztpraxis, Jacques-Offenbach-Straße',
  authors: [{ name: 'Praxis Dr. Kerim' }],
  creator: 'Praxis Dr. Kerim',
  publisher: 'Praxis Dr. Kerim',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://praxiskerim.de/impressum',
    siteName: 'Praxis Dr. Kerim',
    title: 'Impressum - Praxis Dr. Kerim',
    description: 'Impressum der Praxis Dr. Kerim in Offenbach am Main. Kontaktdaten und rechtliche Angaben der Hausarztpraxis.',
    images: [
      {
        url: 'https://praxiskerim.de/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Praxis Dr. Kerim Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Impressum - Praxis Dr. Kerim',
    description: 'Impressum der Praxis Dr. Kerim in Offenbach am Main. Kontaktdaten und rechtliche Angaben der Hausarztpraxis.',
    images: ['https://praxiskerim.de/images/logo.png'],
  },
  alternates: {
    canonical: 'https://praxiskerim.de/impressum',
  },
  category: 'medical',
  classification: 'Medical Practice',
  other: {
    'revisit-after': '7 days',
    'language': 'de',
    'geo.region': 'DE-HE',
    'geo.placename': 'Offenbach am Main',
    'geo.position': '50.086399971524926;8.75859727672319',
    'ICBM': '50.086399971524926, 8.75859727672319',
  },
};
