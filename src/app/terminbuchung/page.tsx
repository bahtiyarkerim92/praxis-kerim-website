
"use client";


import { useI18n } from "../../i18n";
import BookingForm from "./BookingForm";
import BookingCalendar from "./BookingCalendar";
import React, { useState } from "react";

import type { Slot } from "./types";

export default function TerminbuchungPage() {
  const { t } = useI18n();
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  return (
    <main className="w-full">
      {/* Hero */}
      <section className="relative w-full h-[200px] md:h-[260px] bg-gradient-to-r from-[#232526] to-[#181818] flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg text-center w-full">{t('terminbuchung.heroTitle')}</h1>
      </section>

      {/* Info Section */}
      <section className="w-full bg-white text-black py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#EEC16B]">
            {t('terminbuchung.infoTitle')}
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-10">
            {t('terminbuchung.infoText1')}
            <br />
            {t('terminbuchung.infoText2')}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href="https://wa.me/DEIN_WHATSAPP_LINK"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-[#EEC16B] text-black font-bold shadow-lg hover:scale-110 hover:shadow-[0_0_20px_#EEC16B] transition-transform"
            >
              {t('terminbuchung.whatsappButton')}
            </a>
            <a
              href="mailto:info@praxiskerim.de"
              className="px-6 py-3 rounded-full border-2 border-[#EEC16B] text-[#EEC16B] font-bold hover:bg-[#EEC16B] hover:text-black shadow-lg hover:scale-110 transition-transform"
            >
              {t('terminbuchung.emailButton')}
            </a>
            <a
              href="tel:+4969870015360"
              className="px-6 py-3 rounded-full border-2 border-[#EEC16B] text-[#EEC16B] font-bold hover:bg-[#EEC16B] hover:text-black shadow-lg hover:scale-110 transition-transform"
            >
              {t('terminbuchung.phoneButton')}
            </a>
          </div>
        </div>
      </section>
      {/* Interaktiver Kalender & Buchung */}
      <section className="w-full bg-white text-black py-12">
        <div className="max-w-2xl mx-auto px-6">
          <h3 className="text-2xl font-bold mb-4 text-center text-[#EEC16B]">{t('terminbuchung.formTitle') || 'Termin buchen'}</h3>
          {!selectedSlot ? (
            <BookingCalendar onSelectSlot={setSelectedSlot} />
          ) : (
            <div>
              <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
                <div className="font-semibold text-yellow-700">Gewählter Termin:</div>
                <div>{new Date(selectedSlot.when).toLocaleString("de-DE", { dateStyle: "full", timeStyle: "short" })}</div>
                <div className="text-sm text-gray-600">Arzt: {selectedSlot.doctorName}</div>
                <button className="mt-2 text-xs underline text-yellow-700" onClick={() => setSelectedSlot(null)}>anderen Termin wählen</button>
              </div>
              <BookingForm onSuccess={() => setSelectedSlot(null)} slot={selectedSlot} />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
