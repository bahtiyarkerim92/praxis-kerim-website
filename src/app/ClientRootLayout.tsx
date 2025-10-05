"use client";

import { I18nProvider } from '../i18n';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PageIndicator from '../components/PageIndicator';
import ScrollToTopButton from "../components/ScrollToTopButton";
import "./globals.css";
import { useI18n } from '../i18n';

function InnerLayout({ children }: { children: React.ReactNode }) {
  const { lang } = useI18n();
  return (
    <>
      <Header />
      <PageIndicator />
      {/* Key on lang to force rerender on language change */}
      <main className="flex-1" key={lang}>{children}</main>
      <Footer />
    </>
  );
}

export default function ClientRootLayout({ children, initialLang }: { children: React.ReactNode, initialLang: 'de' | 'bg' | 'tr' | 'en' | 'pl' }) {
  return (
    <I18nProvider initialLang={initialLang}>
      <InnerLayout>{children}</InnerLayout>
      <ScrollToTopButton />
    </I18nProvider>
  );
}
