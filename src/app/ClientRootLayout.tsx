"use client";

import { I18nProvider } from '../i18n';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PageIndicator from '../components/PageIndicator';
import { Geist, Geist_Mono } from "next/font/google";
import ScrollToTopButton from "../components/ScrollToTopButton";
import "./globals.css";
import { useI18n } from '../i18n';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html lang={initialLang}>
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <I18nProvider initialLang={initialLang}>
          <InnerLayout>{children}</InnerLayout>
        </I18nProvider>
        <ScrollToTopButton />
      </body>
    </html>
  );
}
