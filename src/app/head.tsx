export default function Head() {
  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Praxis Dr. Kerim – Hausarzt Offenbach</title>
      <meta name="description" content="Internationale hausärztliche Versorgung nach höchstem wissenschaftlichen Standard. Terminbuchung, Bestellformulare und mehr bei Praxis Dr. Kerim in Offenbach." />
      <meta name="author" content="Praxis Dr. Kerim" />
      <meta name="keywords" content="Hausarzt, Offenbach, Termin, Rezept, Überweisung, Krankenschein, Medizin, Praxis, Dr. Kerim" />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      {/* Open Graph Meta-Tags */}
      <meta property="og:title" content="Praxis Dr. Kerim – Hausarzt Offenbach" />
      <meta property="og:description" content="Internationale hausärztliche Versorgung nach höchstem wissenschaftlichen Standard. Terminbuchung, Bestellformulare und mehr bei Praxis Dr. Kerim in Offenbach." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://praxiskerim.de/" />
      <meta property="og:image" content="https://praxiskerim.de/images/slider-poster3.png" />
      {/* Twitter Card Meta-Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Praxis Dr. Kerim – Hausarzt Offenbach" />
      <meta name="twitter:description" content="Internationale hausärztliche Versorgung nach höchstem wissenschaftlichen Standard. Terminbuchung, Bestellformulare und mehr bei Praxis Dr. Kerim in Offenbach." />
      <meta name="twitter:image" content="https://praxiskerim.de/images/slider-poster3.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
          "@context": "https://schema.org",
          "@type": "MedicalOrganization",
          "name": "Praxis Dr. Kerim",
          "url": "https://praxiskerim.de/",
          "logo": "https://praxiskerim.de/images/logo.PNG",
          "image": "https://praxiskerim.de/images/slider-poster3.png",
          "description": "Internationale hausärztliche Versorgung nach höchstem wissenschaftlichen Standard. Terminbuchung, Bestellformulare und mehr bei Praxis Dr. Kerim in Offenbach.",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Jacques-Offenbach-Straße 12",
            "addressLocality": "Offenbach am Main",
            "postalCode": "63069",
            "addressCountry": "DE"
          },
          "telephone": "+49 69 870015360",
          "email": "info@praxiskerim.de",
          "openingHours": "Mo-Do 07:30-12:00, 14:30-18:00; Fr 07:30-12:00",
          "medicalSpecialty": ["GeneralPractice", "InternalMedicine", "Surgery"]
        }` }} />
    </>
  );
}
