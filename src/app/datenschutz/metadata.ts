import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung - Praxis Dr. Kerim | DSGVO-konform',
  description: 'Datenschutzerklärung der Praxis Dr. Kerim in Offenbach am Main. DSGVO-konforme Informationen zum Umgang mit personenbezogenen Daten.',
  keywords: 'Datenschutz, DSGVO, Praxis Dr. Kerim, Datenschutzerklärung, personenbezogene Daten, Hausarzt Offenbach, Datenschutzrecht',
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
    url: 'https://praxiskerim.de/datenschutz',
    siteName: 'Praxis Dr. Kerim',
    title: 'Datenschutzerklärung - Praxis Dr. Kerim',
    description: 'Datenschutzerklärung der Praxis Dr. Kerim in Offenbach am Main. DSGVO-konforme Informationen zum Umgang mit personenbezogenen Daten.',
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
    title: 'Datenschutzerklärung - Praxis Dr. Kerim',
    description: 'Datenschutzerklärung der Praxis Dr. Kerim in Offenbach am Main. DSGVO-konforme Informationen zum Umgang mit personenbezogenen Daten.',
    images: ['https://praxiskerim.de/images/logo.png'],
  },
  alternates: {
    canonical: 'https://praxiskerim.de/datenschutz',
  },
  category: 'legal',
  classification: 'Privacy Policy',
  other: {
    'revisit-after': '7 days',
    'language': 'de',
    'geo.region': 'DE-HE',
    'geo.placename': 'Offenbach am Main',
    'geo.position': '50.086399971524926;8.75859727672319',
    'ICBM': '50.086399971524926, 8.75859727672319',
  },
};
