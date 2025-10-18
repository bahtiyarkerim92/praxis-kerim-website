"use client";

import { useI18n } from '../../i18n';
import Head from 'next/head';

export default function ImpressumPage() {
  const { t } = useI18n();

  return (
    <>
      <Head>
        <title>{t('impressum.title')} - Praxis Dr. Kerim | Hausarzt Offenbach</title>
        <meta name="description" content="Impressum der Praxis Dr. Kerim in Offenbach am Main. Kontaktdaten, rechtliche Angaben und Verantwortlichkeiten der Hausarztpraxis." />
        <meta name="keywords" content="Impressum, Praxis Dr. Kerim, Hausarzt Offenbach, Kontakt, rechtliche Angaben, Arztpraxis, Jacques-Offenbach-Straße" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Praxis Dr. Kerim" />
        <meta name="language" content="de" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${t('impressum.title')} - Praxis Dr. Kerim`} />
        <meta property="og:description" content="Impressum der Praxis Dr. Kerim in Offenbach am Main. Kontaktdaten und rechtliche Angaben der Hausarztpraxis." />
        <meta property="og:url" content="https://praxiskerim.de/impressum" />
        <meta property="og:site_name" content="Praxis Dr. Kerim" />
        <meta property="og:locale" content="de_DE" />
        <meta property="og:image" content="https://praxiskerim.de/images/logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Praxis Dr. Kerim Logo" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${t('impressum.title')} - Praxis Dr. Kerim`} />
        <meta name="twitter:description" content="Impressum der Praxis Dr. Kerim in Offenbach am Main. Kontaktdaten und rechtliche Angaben der Hausarztpraxis." />
        <meta name="twitter:image" content="https://praxiskerim.de/images/logo.png" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://praxiskerim.de/impressum" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              "name": "Praxis Dr. Kerim",
              "description": "Hausarztpraxis in Offenbach am Main",
              "url": "https://praxiskerim.de",
              "telephone": "+49 69 870015360",
              "email": "info@praxiskerim.de",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Jacques-Offenbach-Straße 12",
                "addressLocality": "Offenbach am Main",
                "postalCode": "63069",
                "addressCountry": "DE"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "50.086399971524926",
                "longitude": "8.75859727672319"
              },
              "openingHours": [
                "Mo-Th 07:30-12:00,14:30-18:00",
                "Fr 07:30-12:00"
              ],
              "medicalSpecialty": "General Practice",
              "priceRange": "$$",
              "paymentAccepted": "Cash, Credit Card, Insurance",
              "currenciesAccepted": "EUR"
            })
          }}
        />
      </Head>
      
      <main className="w-full bg-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-8 text-black text-center">
          {t('impressum.title')}
        </h1>
        
        <div className="prose prose-lg max-w-none text-center">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#EEC16B]">
              {t('impressum.practiceInfo.title')}
            </h2>
            <div className="text-gray-700 space-y-2">
              <p><strong>{t('impressum.practiceInfo.name')}</strong></p>
              <p>{t('impressum.practiceInfo.address1')}</p>
              <p>{t('impressum.practiceInfo.address2')}</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#EEC16B]">
              {t('impressum.contact.title')}
            </h2>
            <div className="text-gray-700 space-y-2">
              <p><strong>{t('impressum.contact.phone')}:</strong> +49 69 870015360</p>
              <p><strong>{t('impressum.contact.phone2')}:</strong> +49 69 84 20 81</p>
              <p><strong>{t('impressum.contact.fax')}:</strong> +49 69 84 49 72</p>
              <p><strong>{t('impressum.contact.email')}:</strong> info@praxiskerim.de</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#EEC16B]">
              {t('impressum.legal.title')}
            </h2>
            <div className="text-gray-700 space-y-2">
              <p><strong>{t('impressum.legal.registration')}:</strong> {t('impressum.legal.registrationText')}</p>
              <p><strong>{t('impressum.legal.taxId')}:</strong> {t('impressum.legal.taxIdText')}</p>
              <p><strong>{t('impressum.legal.professionalTitle')}:</strong> {t('impressum.legal.professionalTitleText')}</p>
              <p><strong>{t('impressum.legal.responsible')}:</strong> {t('impressum.legal.responsibleText')}</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#EEC16B]">
              {t('impressum.disclaimer.title')}
            </h2>
            <div className="text-gray-700 space-y-4">
              <p>{t('impressum.disclaimer.content1')}</p>
              <p>{t('impressum.disclaimer.content2')}</p>
              <p>{t('impressum.disclaimer.content3')}</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#EEC16B]">
              {t('impressum.liability.title')}
            </h2>
            <div className="text-gray-700 space-y-4">
              <p>{t('impressum.liability.content1')}</p>
              <p>{t('impressum.liability.content2')}</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#EEC16B]">
              {t('impressum.copyright.title')}
            </h2>
            <div className="text-gray-700 space-y-4">
              <p>{t('impressum.copyright.content1')}</p>
              <p>{t('impressum.copyright.content2')}</p>
            </div>
          </section>
        </div>
      </div>
      </main>
    </>
  );
}
