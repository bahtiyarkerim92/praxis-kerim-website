
import { cookies } from 'next/headers';
import ClientRootLayout from './ClientRootLayout';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const lang = (cookieStore.get('lang')?.value || 'de') as 'de' | 'bg' | 'tr' | 'en' | 'pl';
  return <ClientRootLayout initialLang={lang}>{children}</ClientRootLayout>;
}
