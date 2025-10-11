
"use client";

import { useI18n } from "../../i18n";
import NewBookingForm from "./NewBookingForm";
import React from "react";

export default function TerminbuchungPage() {
  const { t } = useI18n();
  
  return (
    <main className="w-full">
      {/* Hero */}
      <section className="relative w-full h-[200px] md:h-[260px] bg-gradient-to-r from-[#232526] to-[#181818] flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg text-center w-full px-4">
          {t('terminbuchung.heroTitle')}
        </h1>
      </section>

      {/* Booking Form Section */}
      <section className="w-full bg-gray-50 text-black py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold mb-8 text-center text-[#EEC16B]">
            {t('terminbuchung.formTitle') || 'Termin buchen'}
          </h3>
          <NewBookingForm onSuccess={() => {
            // Handle success - maybe show a success message or redirect
            console.log("Booking successful!");
          }} />
        </div>
      </section>

      {/* Contact Options Section */}
      <section className="w-full bg-white text-black py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#EEC16B]">
            {t('terminbuchung.infoTitle')}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            {t('terminbuchung.infoText1')}
            <br />
            {t('terminbuchung.infoText2')}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href="https://wa.me/4969870015360"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-[#EEC16B] text-black font-bold shadow-lg hover:scale-105 hover:shadow-[0_0_20px_#EEC16B] transition-transform"
            >
              {t('terminbuchung.whatsappButton')}
            </a>
            <a
              href="mailto:info@praxiskerim.de"
              className="px-6 py-3 rounded-full border-2 border-[#EEC16B] text-[#EEC16B] font-bold hover:bg-[#EEC16B] hover:text-black shadow-lg hover:scale-105 transition-transform"
            >
              {t('terminbuchung.emailButton')}
            </a>
            <a
              href="tel:+4969870015360"
              className="px-6 py-3 rounded-full border-2 border-[#EEC16B] text-[#EEC16B] font-bold hover:bg-[#EEC16B] hover:text-black shadow-lg hover:scale-105 transition-transform"
            >
              {t('terminbuchung.phoneButton')}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
