import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://praxiskerim.de';
  const languages = ['de', 'en', 'bg', 'tr', 'pl'];
  
  const routes = [
    '',
    '/terminbuchung',
    '/bestellung',
    '/ueber-uns',
    '/kontakt',
    '/allgemeinmedizin',
    '/innere-medizin',
    '/chirurgie',
    '/beschneidungen',
    '/uslugi',
    '/impressum',
    '/datenschutz',
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // Add routes for each language
  routes.forEach((route) => {
    languages.forEach((lang) => {
      // Determine priority based on page importance
      let priority = 0.7;
      let changeFrequency: 'daily' | 'weekly' | 'monthly' = 'weekly';
      
      if (route === '') {
        priority = 1.0;
        changeFrequency = 'daily';
      } else if (route === '/terminbuchung' || route === '/bestellung') {
        priority = 0.9;
        changeFrequency = 'daily';
      } else if (route === '/kontakt' || route === '/ueber-uns') {
        priority = 0.8;
        changeFrequency = 'monthly';
      } else if (route === '/impressum' || route === '/datenschutz') {
        priority = 0.6;
        changeFrequency = 'monthly';
      } else {
        priority = 0.7;
        changeFrequency = 'weekly';
      }
      
      sitemap.push({
        url: `${baseUrl}${lang === 'de' ? '' : `/${lang}`}${route}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: {
          languages: languages.reduce((acc, l) => {
            acc[l] = `${baseUrl}${l === 'de' ? '' : `/${l}`}${route}`;
            return acc;
          }, {} as Record<string, string>),
        },
      });
    });
  });

  return sitemap;
}

