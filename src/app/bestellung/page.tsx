
"use client";


import { useI18n } from '../../i18n';
import OrderForm from './OrderForm';

export default function BestellungPage() {
  const { t } = useI18n();
  return (
    <main className="w-full">
      {/* Hero */}
      <section className="relative w-full h-[200px] md:h-[260px] bg-gradient-to-r from-[#232526] to-[#181818] flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg text-center w-full">{t('bestellung.heroTitle')}</h1>
      </section>

      {/* Info Section */}
      <section className="w-full bg-white text-black py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#EEC16B]">
            {t('bestellung.infoTitle')}
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-10">
            {t('bestellung.infoText')}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href="https://wa.me/DEIN_WHATSAPP_LINK"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-[#EEC16B] text-black font-bold shadow-lg hover:scale-110 hover:shadow-[0_0_20px_#EEC16B] transition-transform"
            >
              {t('about.whatsappChannel')}
            </a>
            <a
              href="mailto:info@praxiskerim.de"
              className="px-6 py-3 rounded-full border-2 border-[#EEC16B] text-[#EEC16B] font-bold hover:bg-[#EEC16B] hover:text-black shadow-lg hover:scale-110 transition-transform"
            >
              {t('bestellung.emailButton')}
            </a>
            <a
              href="tel:+4969870015360"
              className="px-6 py-3 rounded-full border-2 border-[#EEC16B] text-[#EEC16B] font-bold hover:bg-[#EEC16B] hover:text-black shadow-lg hover:scale-110 transition-transform"
            >
              {t('bestellung.phoneButton')}
            </a>
          </div>
        </div>
      </section>
      {/* Order Form Section */}
      <section className="w-full bg-white text-black py-12">
        <div className="max-w-2xl mx-auto px-6">
          <h3 className="text-2xl font-bold mb-4 text-center text-[#EEC16B]">{t('bestellung.formTitle') || 'Rezept/Medikament bestellen'}</h3>
          <OrderForm onSuccess={() => {}} />
        </div>
      </section>
    </main>
  );
}
