"use client";

import { useI18n } from '../../i18n';
import Head from 'next/head';

export default function DatenschutzPage() {
  const { t } = useI18n();

  return (
    <>
      <Head>
        <title>{t('datenschutz.title')} - Praxis Dr. Kerim | DSGVO-konform</title>
        <meta name="description" content="Datenschutzerklärung der Praxis Dr. Kerim in Offenbach am Main. DSGVO-konforme Informationen zum Umgang mit personenbezogenen Daten." />
        <meta name="keywords" content="Datenschutz, DSGVO, Praxis Dr. Kerim, Datenschutzerklärung, personenbezogene Daten, Hausarzt Offenbach, Datenschutzrecht" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Praxis Dr. Kerim" />
        <meta name="language" content="de" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${t('datenschutz.title')} - Praxis Dr. Kerim`} />
        <meta property="og:description" content="Datenschutzerklärung der Praxis Dr. Kerim in Offenbach am Main. DSGVO-konforme Informationen zum Umgang mit personenbezogenen Daten." />
        <meta property="og:url" content="https://praxiskerim.de/datenschutz" />
        <meta property="og:site_name" content="Praxis Dr. Kerim" />
        <meta property="og:locale" content="de_DE" />
        <meta property="og:image" content="https://praxiskerim.de/images/logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Praxis Dr. Kerim Logo" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${t('datenschutz.title')} - Praxis Dr. Kerim`} />
        <meta name="twitter:description" content="Datenschutzerklärung der Praxis Dr. Kerim in Offenbach am Main. DSGVO-konforme Informationen zum Umgang mit personenbezogenen Daten." />
        <meta name="twitter:image" content="https://praxiskerim.de/images/logo.png" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://praxiskerim.de/datenschutz" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Datenschutzerklärung - Praxis Dr. Kerim",
              "description": "DSGVO-konforme Datenschutzerklärung der Praxis Dr. Kerim",
              "url": "https://praxiskerim.de/datenschutz",
              "mainEntity": {
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
                "medicalSpecialty": "General Practice"
              },
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Startseite",
                    "item": "https://praxiskerim.de"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Datenschutz",
                    "item": "https://praxiskerim.de/datenschutz"
                  }
                ]
              }
            })
          }}
        />
      </Head>
      
      <main className="w-full bg-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-8 text-black text-center">
          {t('datenschutz.title')}
        </h1>
        
        <div className="prose prose-lg max-w-none text-center">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#EEC16B]">
              {t('datenschutz.intro.title')}
            </h2>
            <div className="text-gray-700 space-y-4">
              <p>{t('datenschutz.intro.content1')}</p>
              <p>{t('datenschutz.intro.content2')}</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#EEC16B]">
              {t('datenschutz.responsible.title')}
            </h2>
            <div className="text-gray-700 space-y-2">
              <p><strong>{t('datenschutz.responsible.name')}</strong></p>
              <p>{t('datenschutz.responsible.address1')}</p>
              <p>{t('datenschutz.responsible.address2')}</p>
              <p><strong>{t('datenschutz.responsible.phone')}:</strong> +49 69 870015360</p>
              <p><strong>{t('datenschutz.responsible.email')}:</strong> info@praxiskerim.de</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#EEC16B]">
              {t('datenschutz.dataCollection.title')}
            </h2>
            <div className="text-gray-700 space-y-4">
              <p>{t('datenschutz.dataCollection.content1')}</p>
              <p>{t('datenschutz.dataCollection.content2')}</p>
              <p>{t('datenschutz.dataCollection.content3')}</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#EEC16B]">
              {t('datenschutz.purpose.title')}
            </h2>
            <div className="text-gray-700 space-y-4">
              <p>{t('datenschutz.purpose.content1')}</p>
              <p>{t('datenschutz.purpose.content2')}</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#EEC16B]">
              {t('datenschutz.storage.title')}
            </h2>
            <div className="text-gray-700 space-y-4">
              <p>{t('datenschutz.storage.content1')}</p>
              <p>{t('datenschutz.storage.content2')}</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#EEC16B]">
              {t('datenschutz.rights.title')}
            </h2>
            <div className="text-gray-700 space-y-4">
              <p>{t('datenschutz.rights.content1')}</p>
              <p>{t('datenschutz.rights.content2')}</p>
              <p>{t('datenschutz.rights.content3')}</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#EEC16B]">
              {t('datenschutz.cookies.title')}
            </h2>
            <div className="text-gray-700 space-y-4">
              <p>{t('datenschutz.cookies.content1')}</p>
              <p>{t('datenschutz.cookies.content2')}</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#EEC16B]">
              {t('datenschutz.contact.title')}
            </h2>
            <div className="text-gray-700 space-y-4">
              <p>{t('datenschutz.contact.content1')}</p>
              <p>{t('datenschutz.contact.content2')}</p>
            </div>
          </section>
        </div>
      </div>
      </main>
    </>
  );
}
