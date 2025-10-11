import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { generatePageMetadata } from '../../config/seo';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = (cookieStore.get('lang')?.value || 'de') as 'de' | 'bg' | 'tr' | 'en' | 'pl';
  
  return generatePageMetadata('ueber-uns', lang);
}

export default function UeberUnsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

