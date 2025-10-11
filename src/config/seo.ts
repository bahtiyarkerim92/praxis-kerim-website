import { Metadata } from 'next';

// Base SEO configuration
export const siteConfig = {
  name: 'Praxis Dr. Kerim',
  description: {
    de: 'Moderne hausärztliche Versorgung in Offenbach am Main. Dr. Bahtyiar Kerim bietet umfassende medizinische Betreuung, Terminbuchung online, Rezepte und Überweisungen.',
    en: 'Modern general medical care in Offenbach am Main. Dr. Bahtyiar Kerim offers comprehensive medical care, online appointment booking, prescriptions and referrals.',
    bg: 'Модерна общомедицинска грижа в Офенбах на Майн. Д-р Бахтияр Керим предлага цялостни медицински грижи, онлайн запазване на часове, рецепти и насочвания.',
    tr: "Offenbach am Main'de modern genel tıbbi bakım. Dr. Bahtyiar Kerim kapsamlı tıbbi bakım, çevrimiçi randevu alma, reçete ve sevkler sunmaktadır.",
    pl: 'Nowoczesna opieka lekarska w Offenbach am Main. Dr Bahtyiar Kerim oferuje kompleksową opiekę medyczną, rezerwację wizyt online, recepty i skierowania.',
  },
  url: 'https://praxiskerim.de',
  ogImage: '/og-image.jpg',
  links: {
    facebook: 'https://facebook.com/praxiskerim',
    instagram: 'https://instagram.com/praxiskerim',
  },
  contact: {
    phone: '+49 69 870015360',
    email: 'info@praxiskerim.de',
    address: {
      street: 'Jacques-Offenbach-Straße 12',
      city: 'Offenbach am Main',
      postalCode: '63069',
      country: 'Germany',
    },
  },
  openingHours: {
    monday: '07:30-12:00, 14:30-18:00',
    tuesday: '07:30-12:00, 14:30-18:00',
    wednesday: '07:30-12:00, 14:30-18:00',
    thursday: '07:30-12:00, 14:30-18:00',
    friday: '07:30-12:00',
    saturday: 'Closed',
    sunday: 'Closed',
  },
};

// Keywords by language
export const keywords = {
  de: [
    'Hausarzt Offenbach',
    'Dr. Kerim',
    'Arztpraxis Offenbach',
    'Allgemeinmedizin',
    'Terminbuchung online',
    'Videosprechstunde',
    'Rezept online',
    'Überweisung',
    'Krankmeldung',
    'Hausarzt Frankfurt',
    'Familienarzt',
    'Vorsorgeuntersuchung',
    'Impfungen',
    'Gesundheitscheck',
  ],
  en: [
    'General Practitioner Offenbach',
    'Dr. Kerim',
    'Medical Practice Offenbach',
    'General Medicine',
    'Online Appointment',
    'Video Consultation',
    'Online Prescription',
    'Medical Referral',
    'Sick Note',
    'Family Doctor',
    'Preventive Examination',
    'Vaccinations',
    'Health Check',
  ],
  bg: [
    'Личен лекар Офенбах',
    'Д-р Керим',
    'Медицински център Офенбах',
    'Обща медицина',
    'Онлайн час',
    'Видео консултация',
    'Онлайн рецепта',
    'Медицинско насочване',
    'Болничен лист',
    'Семеен лекар',
    'Профилактичен преглед',
    'Ваксинации',
    'Здравен преглед',
  ],
  tr: [
    'Aile Hekimi Offenbach',
    'Dr. Kerim',
    'Tıp Merkezi Offenbach',
    'Genel Tıp',
    'Online Randevu',
    'Video Konsültasyon',
    'Online Reçete',
    'Tıbbi Sevk',
    'Hastalık Raporu',
    'Aile Doktoru',
    'Önleyici Muayene',
    'Aşılar',
    'Sağlık Kontrolü',
  ],
  pl: [
    'Lekarz rodzinny Offenbach',
    'Dr Kerim',
    'Praktyka lekarska Offenbach',
    'Medycyna ogólna',
    'Wizyta online',
    'Konsultacja wideo',
    'Recepta online',
    'Skierowanie',
    'Zwolnienie lekarskie',
    'Lekarz rodzinny',
    'Badania profilaktyczne',
    'Szczepienia',
    'Kontrola zdrowia',
  ],
};

// Generate metadata for pages
export function generatePageMetadata(
  pageName: string,
  lang: 'de' | 'en' | 'bg' | 'tr' | 'pl' = 'de',
  customDescription?: string,
  customKeywords?: string[]
): Metadata {
  const titles: Record<string, Record<string, string>> = {
    home: {
      de: 'Praxis Dr. Kerim - Hausarzt in Offenbach am Main | Online Terminbuchung',
      en: 'Praxis Dr. Kerim - General Practitioner in Offenbach | Book Online',
      bg: 'Praxis Dr. Kerim - Личен лекар в Офенбах | Запазете час онлайн',
      tr: 'Praxis Dr. Kerim - Offenbach Aile Hekimi | Online Randevu',
      pl: 'Praxis Dr. Kerim - Lekarz rodzinny Offenbach | Rezerwacja online',
    },
    terminbuchung: {
      de: 'Online Termin buchen - Hausarzt Dr. Kerim Offenbach',
      en: 'Book Appointment Online - Dr. Kerim Offenbach',
      bg: 'Онлайн запазване на час - Д-р Керим Офенбах',
      tr: 'Online Randevu Al - Dr. Kerim Offenbach',
      pl: 'Umów wizytę online - Dr. Kerim Offenbach',
    },
    bestellung: {
      de: 'Rezepte & Überweisungen online bestellen | Praxis Dr. Kerim',
      en: 'Order Prescriptions & Referrals Online | Praxis Dr. Kerim',
      bg: 'Онлайн поръчка на рецепти и насочвания | Praxis Dr. Kerim',
      tr: 'Reçete ve Sevk Online Sipariş | Praxis Dr. Kerim',
      pl: 'Zamów recepty i skierowania online | Praxis Dr. Kerim',
    },
    'ueber-uns': {
      de: 'Über uns - Dr. Bahtyiar Kerim & Team | Hausarzt Offenbach',
      en: 'About Us - Dr. Bahtyiar Kerim & Team | Offenbach',
      bg: 'За нас - Д-р Бахтияр Керим и екип | Офенбах',
      tr: 'Hakkımızda - Dr. Bahtyiar Kerim ve Ekip | Offenbach',
      pl: 'O nas - Dr. Bahtyiar Kerim i zespół | Offenbach',
    },
    kontakt: {
      de: 'Kontakt & Anfahrt - Praxis Dr. Kerim Offenbach | Sprechzeiten',
      en: 'Contact & Directions - Praxis Dr. Kerim Offenbach | Hours',
      bg: 'Контакт и как да стигнете - Praxis Dr. Kerim Офенбах',
      tr: 'İletişim ve Yol Tarifi - Praxis Dr. Kerim Offenbach',
      pl: 'Kontakt i dojazd - Praxis Dr. Kerim Offenbach | Godziny',
    },
    allgemeinmedizin: {
      de: 'Allgemeinmedizin - Hausärztliche Versorgung | Praxis Dr. Kerim',
      en: 'General Medicine - Primary Care Services | Praxis Dr. Kerim',
      bg: 'Обща медицина - Първична медицинска помощ | Praxis Dr. Kerim',
      tr: 'Genel Tıp - Birinci Basamak Sağlık Hizmetleri | Praxis Dr. Kerim',
      pl: 'Medycyna ogólna - Podstawowa opieka zdrowotna | Praxis Dr. Kerim',
    },
    'innere-medizin': {
      de: 'Innere Medizin - Internistische Behandlung | Praxis Dr. Kerim',
      en: 'Internal Medicine - Comprehensive Care | Praxis Dr. Kerim',
      bg: 'Вътрешни болести - Цялостни грижи | Praxis Dr. Kerim',
      tr: 'İç Hastalıkları - Kapsamlı Tedavi | Praxis Dr. Kerim',
      pl: 'Choroby wewnętrzne - Kompleksowa opieka | Praxis Dr. Kerim',
    },
    chirurgie: {
      de: 'Kleine Chirurgie - Ambulante Eingriffe | Praxis Dr. Kerim',
      en: 'Minor Surgery - Outpatient Procedures | Praxis Dr. Kerim',
      bg: 'Малка хирургия - Амбулаторни процедури | Praxis Dr. Kerim',
      tr: 'Küçük Cerrahi - Ayakta Tedavi | Praxis Dr. Kerim',
      pl: 'Mała chirurgia - Zabiegi ambulatoryjne | Praxis Dr. Kerim',
    },
    beschneidungen: {
      de: 'Beschneidung - Professionelle Zirkumzision | Praxis Dr. Kerim',
      en: 'Circumcision - Professional Services | Praxis Dr. Kerim',
      bg: 'Обрязване - Професионални услуги | Praxis Dr. Kerim',
      tr: 'Sünnet - Profesyonel Sünnet Hizmeti | Praxis Dr. Kerim',
      pl: 'Obrzezanie - Profesjonalne usługi | Praxis Dr. Kerim',
    },
    uslugi: {
      de: 'Unsere Leistungen - Medizinische Services | Praxis Dr. Kerim',
      en: 'Our Services - Medical Care Overview | Praxis Dr. Kerim',
      bg: 'Нашите услуги - Медицински грижи | Praxis Dr. Kerim',
      tr: 'Hizmetlerimiz - Tıbbi Bakım Hizmetleri | Praxis Dr. Kerim',
      pl: 'Nasze usługi - Opieka medyczna | Praxis Dr. Kerim',
    },
  };

  const descriptions: Record<string, Record<string, string>> = {
    home: {
      de: 'Praxis Dr. Kerim in Offenbach - Ihr Hausarzt für moderne medizinische Versorgung. Online-Terminbuchung, Videosprechstunde, Rezepte & Überweisungen. Mo-Do 7:30-18:00, Fr 7:30-12:00.',
      en: 'Praxis Dr. Kerim in Offenbach - Your general practitioner for modern healthcare. Online appointment booking, video consultations, prescriptions & referrals. Mon-Thu 7:30-18:00, Fri 7:30-12:00.',
      bg: 'Praxis Dr. Kerim в Офенбах - Вашият личен лекар за модерни медицински грижи. Онлайн запазване на часове, видео консултации, рецепти и насочвания. Пон-Чет 7:30-18:00, Пет 7:30-12:00.',
      tr: 'Praxis Dr. Kerim Offenbach - Modern sağlık hizmetleri için aile hekiminiz. Online randevu, video konsültasyon, reçete ve sevkler. Pzt-Per 7:30-18:00, Cum 7:30-12:00.',
      pl: 'Praxis Dr. Kerim w Offenbach - Twój lekarz rodzinny dla nowoczesnej opieki zdrowotnej. Rezerwacja online, konsultacje wideo, recepty i skierowania. Pon-Czw 7:30-18:00, Pt 7:30-12:00.',
    },
    terminbuchung: {
      de: 'Online Termin beim Hausarzt Dr. Kerim in Offenbach buchen. Wählen Sie bequem Ihren Wunschtermin. Schnelle Terminvergabe, keine Wartezeit am Telefon. Videosprechstunde verfügbar.',
      en: 'Book online appointment with Dr. Kerim in Offenbach. Choose your preferred time conveniently. Fast scheduling, no phone waiting. Video consultations available.',
      bg: 'Запазете онлайн час при д-р Керим в Офенбах. Изберете удобно желаното време. Бързо насрочване, без чакане на телефона. Видео консултации налични.',
      tr: 'Offenbach\'ta Dr. Kerim ile online randevu alın. Tercih ettiğiniz zamanı rahatça seçin. Hızlı randevu, telefonda bekleme yok. Video konsültasyon mevcut.',
      pl: 'Umów wizytę online u dr. Kerima w Offenbach. Wybierz wygodnie preferowany termin. Szybka rezerwacja, bez czekania na telefon. Konsultacje wideo dostępne.',
    },
    bestellung: {
      de: 'Rezepte, Überweisungen und Krankmeldungen online bestellen - Praxis Dr. Kerim. Bequem von zu Hause, schnelle Bearbeitung, digitaler Service für Kassenpatienten und Privatversicherte.',
      en: 'Order prescriptions, referrals and sick notes online - Praxis Dr. Kerim. From home, fast processing, digital service for public and private insurance.',
      bg: 'Поръчайте рецепти, насочвания и болнични листове онлайн - Praxis Dr. Kerim. От дома, бърза обработка, дигитална услуга за държавна и частна застраховка.',
      tr: 'Reçete, sevk ve hastalık raporu online sipariş - Praxis Dr. Kerim. Evden, hızlı işlem, kamu ve özel sigorta için dijital hizmet.',
      pl: 'Zamów recepty, skierowania i zwolnienia online - Praxis Dr. Kerim. Z domu, szybka realizacja, cyfrowa usługa dla ubezpieczenia publicznego i prywatnego.',
    },
    'ueber-uns': {
      de: 'Dr. Bahtyiar Kerim - Facharzt für Allgemeinmedizin in Offenbach. Erfahrenes Team, moderne Ausstattung, persönliche Betreuung. Ihre Gesundheit ist unsere Priorität.',
      en: 'Dr. Bahtyiar Kerim - Specialist in General Medicine in Offenbach. Experienced team, modern equipment, personal care. Your health is our priority.',
      bg: 'Д-р Бахтияр Керим - Специалист по обща медицина в Офенбах. Опитен екип, модерно оборудване, лични грижи. Вашето здраве е наш приоритет.',
      tr: 'Dr. Bahtyiar Kerim - Offenbach\'ta Genel Tıp Uzmanı. Deneyimli ekip, modern ekipman, kişisel bakım. Sağlığınız önceliğimizdir.',
      pl: 'Dr. Bahtyiar Kerim - Specjalista medycyny ogólnej w Offenbach. Doświadczony zespół, nowoczesny sprzęt, osobista opieka. Twoje zdrowie jest naszym priorytetem.',
    },
    kontakt: {
      de: 'Kontakt Praxis Dr. Kerim Offenbach: ☎ +49 69 870015360 📧 info@praxiskerim.de 📍 Jacques-Offenbach-Str. 12. Sprechzeiten, Anfahrt, Parkmöglichkeiten. Wir sind für Sie da!',
      en: 'Contact Praxis Dr. Kerim Offenbach: ☎ +49 69 870015360 📧 info@praxiskerim.de 📍 Jacques-Offenbach-Str. 12. Opening hours, directions, parking. We are here for you!',
      bg: 'Контакт Praxis Dr. Kerim Офенбах: ☎ +49 69 870015360 📧 info@praxiskerim.de 📍 Jacques-Offenbach-Str. 12. Работно време, маршрут, паркинг. Ние сме тук за вас!',
      tr: 'İletişim Praxis Dr. Kerim Offenbach: ☎ +49 69 870015360 📧 info@praxiskerim.de 📍 Jacques-Offenbach-Str. 12. Çalışma saatleri, yol tarifi, park yeri. Sizin için buradayız!',
      pl: 'Kontakt Praxis Dr. Kerim Offenbach: ☎ +49 69 870015360 📧 info@praxiskerim.de 📍 Jacques-Offenbach-Str. 12. Godziny otwarcia, dojazd, parking. Jesteśmy tu dla Ciebie!',
    },
    allgemeinmedizin: {
      de: 'Allgemeinmedizin in der Praxis Dr. Kerim: Vorsorgeuntersuchungen, Impfungen, Gesundheitscheck, chronische Erkrankungen. Umfassende hausärztliche Versorgung für die ganze Familie.',
      en: 'General Medicine at Praxis Dr. Kerim: Preventive examinations, vaccinations, health checks, chronic diseases. Comprehensive primary care for the whole family.',
      bg: 'Обща медицина в Praxis Dr. Kerim: Профилактични прегледи, ваксинации, здравни проверки, хронични заболявания. Цялостни грижи за цялото семейство.',
      tr: 'Praxis Dr. Kerim\'de Genel Tıp: Önleyici muayeneler, aşılar, sağlık kontrolleri, kronik hastalıklar. Tüm aile için kapsamlı birinci basamak sağlık hizmetleri.',
      pl: 'Medycyna ogólna w Praxis Dr. Kerim: Badania profilaktyczne, szczepienia, kontrole zdrowia, choroby przewlekłe. Kompleksowa opieka podstawowa dla całej rodziny.',
    },
    'innere-medizin': {
      de: 'Innere Medizin: Herz-Kreislauf, Diabetes, Bluthochdruck, Stoffwechselerkrankungen. Fachärztliche internistische Behandlung in der Praxis Dr. Kerim Offenbach.',
      en: 'Internal Medicine: Cardiovascular, diabetes, hypertension, metabolic disorders. Specialist internal medicine treatment at Praxis Dr. Kerim Offenbach.',
      bg: 'Вътрешни болести: Сърдечно-съдови, диабет, хипертония, метаболитни нарушения. Специализирано лечение във Praxis Dr. Kerim Офенбах.',
      tr: 'İç Hastalıkları: Kardiyovasküler, diyabet, hipertansiyon, metabolik bozukluklar. Praxis Dr. Kerim Offenbach\'ta uzman iç hastalıkları tedavisi.',
      pl: 'Choroby wewnętrzne: Układ krążenia, cukrzyca, nadciśnienie, zaburzenia metaboliczne. Specjalistyczne leczenie internistyczne w Praxis Dr. Kerim Offenbach.',
    },
    chirurgie: {
      de: 'Kleine Chirurgie: Wundversorgung, Nahtentfernung, kleinere Eingriffe ambulant. Professionelle chirurgische Behandlung in der Praxis Dr. Kerim Offenbach.',
      en: 'Minor Surgery: Wound care, suture removal, minor outpatient procedures. Professional surgical treatment at Praxis Dr. Kerim Offenbach.',
      bg: 'Малка хирургия: Грижи за рани, премахване на конци, малки амбулаторни процедури. Професионално хирургично лечение във Praxis Dr. Kerim Офенбах.',
      tr: 'Küçük Cerrahi: Yara bakımı, dikiş alımı, küçük ayakta cerrahi işlemler. Praxis Dr. Kerim Offenbach\'ta profesyonel cerrahi tedavi.',
      pl: 'Mała chirurgia: Opatrunki, usuwanie szwów, małe zabiegi ambulatoryjne. Profesjonalne leczenie chirurgiczne w Praxis Dr. Kerim Offenbach.',
    },
    beschneidungen: {
      de: 'Professionelle Beschneidung (Zirkumzision) für Kinder und Erwachsene. Erfahrener Arzt, moderne Technik, schmerzarm. Beratung und Terminvereinbarung in der Praxis Dr. Kerim.',
      en: 'Professional circumcision for children and adults. Experienced doctor, modern technique, minimal pain. Consultation and appointment at Praxis Dr. Kerim.',
      bg: 'Професионално обрязване за деца и възрастни. Опитен лекар, модерна техника, минимална болка. Консултация и запазване на час във Praxis Dr. Kerim.',
      tr: 'Çocuklar ve yetişkinler için profesyonel sünnet. Deneyimli doktor, modern teknik, ağrısız. Praxis Dr. Kerim\'de danışma ve randevu.',
      pl: 'Profesjonalne obrzezanie dla dzieci i dorosłych. Doświadczony lekarz, nowoczesna technika, minimalny ból. Konsultacja i wizyta w Praxis Dr. Kerim.',
    },
    uslugi: {
      de: 'Medizinische Leistungen: Allgemeinmedizin, Innere Medizin, kleine Chirurgie, Vorsorge, Impfungen. Vollständiges Leistungsspektrum in der Praxis Dr. Kerim Offenbach.',
      en: 'Medical Services: General medicine, internal medicine, minor surgery, prevention, vaccinations. Complete range of services at Praxis Dr. Kerim Offenbach.',
      bg: 'Медицински услуги: Обща медицина, вътрешни болести, малка хирургия, профилактика, ваксинации. Пълен спектър услуги във Praxis Dr. Kerim Офенбах.',
      tr: 'Tıbbi Hizmetler: Genel tıp, iç hastalıkları, küçük cerrahi, önleme, aşılar. Praxis Dr. Kerim Offenbach\'ta eksiksiz hizmet yelpazesi.',
      pl: 'Usługi medyczne: Medycyna ogólna, choroby wewnętrzne, mała chirurgia, profilaktyka, szczepienia. Pełen zakres usług w Praxis Dr. Kerim Offenbach.',
    },
  };

  const title = titles[pageName]?.[lang] || titles.home[lang];
  const description = customDescription || descriptions[pageName]?.[lang] || siteConfig.description[lang];
  const pageKeywords = customKeywords || keywords[lang];

  return {
    title,
    description,
    keywords: pageKeywords.join(', '),
    authors: [{ name: 'Dr. Bahtyiar Kerim' }],
    creator: 'Praxis Dr. Kerim',
    publisher: 'Praxis Dr. Kerim',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: `/${lang === 'de' ? '' : lang}`,
      languages: {
        'de-DE': '/de',
        'en-US': '/en',
        'bg-BG': '/bg',
        'tr-TR': '/tr',
        'pl-PL': '/pl',
      },
    },
    openGraph: {
      title,
      description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
      locale: lang === 'de' ? 'de_DE' : lang === 'en' ? 'en_US' : lang === 'bg' ? 'bg_BG' : lang === 'tr' ? 'tr_TR' : 'pl_PL',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code', // Replace with actual code
      // yandex: 'your-yandex-verification-code',
      // bing: 'your-bing-verification-code',
    },
  };
}

// JSON-LD structured data for local business
export function generateLocalBusinessJsonLd(lang: 'de' | 'en' | 'bg' | 'tr' | 'pl' = 'de') {
  const translations = {
    de: {
      description: 'Hausarztpraxis für Allgemeinmedizin',
      priceRange: '€€',
    },
    en: {
      description: 'General Practice for General Medicine',
      priceRange: '€€',
    },
    bg: {
      description: 'Практика за обща медицина',
      priceRange: '€€',
    },
    tr: {
      description: 'Genel Tıp Aile Hekimliği',
      priceRange: '€€',
    },
    pl: {
      description: 'Praktyka medycyny ogólnej',
      priceRange: '€€',
    },
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': siteConfig.url,
    name: siteConfig.name,
    description: translations[lang].description,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    priceRange: translations[lang].priceRange,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      postalCode: siteConfig.contact.address.postalCode,
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '50.1016',
      longitude: '8.7637',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '07:30',
        closes: '12:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '14:30',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Friday',
        opens: '07:30',
        closes: '12:00',
      },
    ],
    sameAs: [
      siteConfig.links.facebook,
      siteConfig.links.instagram,
    ],
    hasMap: 'https://maps.app.goo.gl/jpgJxAfiU59x1GHGA',
    medicalSpecialty: 'GeneralPractice',
  };
}

// JSON-LD for doctor
export function generateDoctorJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: 'Dr. Bahtyiar Kerim',
    jobTitle: 'Facharzt für Allgemeinmedizin',
    worksFor: {
      '@type': 'MedicalClinic',
      name: siteConfig.name,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      postalCode: siteConfig.contact.address.postalCode,
      addressCountry: 'DE',
    },
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
  };
}

// JSON-LD for breadcrumbs
export function generateBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>,
  lang: 'de' | 'en' | 'bg' | 'tr' | 'pl' = 'de'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

