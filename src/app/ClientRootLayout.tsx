"use client";

import React from 'react';
import { I18nProvider, useI18n } from '../i18n';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PageIndicator from '../components/PageIndicator';
import ScrollToTopButton from "../components/ScrollToTopButton";
import "./globals.css";

// Debug: Log imports
console.log('I18nProvider:', I18nProvider);
console.log('useI18n:', useI18n);

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
  console.log('ClientRootLayout rendering, I18nProvider is:', I18nProvider);
  
  if (!I18nProvider) {
    return <div>ERROR: I18nProvider is undefined!</div>;
  }
  
  return (
    <I18nProvider initialLang={initialLang}>
      <InnerLayout>{children}</InnerLayout>
      <ScrollToTopButton />
    </I18nProvider>
  );
}
