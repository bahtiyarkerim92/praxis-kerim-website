import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { generatePageMetadata, generateBreadcrumbJsonLd } from '../../config/seo';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = (cookieStore.get('lang')?.value || 'de') as 'de' | 'bg' | 'tr' | 'en' | 'pl';
  
  return generatePageMetadata('terminbuchung', lang);
}

export async function generateBreadcrumb() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get('lang')?.value || 'de') as 'de' | 'bg' | 'tr' | 'en' | 'pl';
  
  const homeText = {
    de: 'Startseite',
    en: 'Home',
    bg: 'Начало',
    tr: 'Ana Sayfa',
    pl: 'Strona główna',
  };
  
  const appointmentText = {
    de: 'Termin buchen',
    en: 'Book Appointment',
    bg: 'Запазване на час',
    tr: 'Randevu Al',
    pl: 'Umów wizytę',
  };
  
  return generateBreadcrumbJsonLd([
    { name: homeText[lang], url: '/' },
    { name: appointmentText[lang], url: '/terminbuchung' },
  ], lang);
}

