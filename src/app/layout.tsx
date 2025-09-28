

import { I18nProvider } from '../i18n';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PageIndicator from '../components/PageIndicator';
import { Geist, Geist_Mono } from "next/font/google";
import ScrollToTopButton from "../components/ScrollToTopButton";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <I18nProvider>
          <Header />
          <PageIndicator />
          <main className="flex-1">{children}</main>
          <Footer />
        </I18nProvider>
        <ScrollToTopButton />
      </body>
    </html>
  );
}
