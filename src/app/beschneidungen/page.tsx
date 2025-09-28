
"use client";
import Image from "next/image";

export default function BeschneidungenPage() {
  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="w-full bg-white text-black p-0 m-0">
        <div className="relative w-full min-h-[320px] md:min-h-[480px] aspect-video flex items-center justify-center overflow-hidden">
          <Image
            src="/images/vid4-poster.png"
            alt="Beschneidung Video Poster"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white via-white/80 to-transparent h-24 pointer-events-none" />
        </div>
        <div className="max-w-6xl mx-auto px-6 text-center mt-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#EEC16B] mb-6">
            Beschneidungen
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            In unserer Praxis führen wir fachgerechte Beschneidungen mit
            modernsten Methoden und höchster medizinischer Sicherheit durch.
            Dabei legen wir großen Wert auf eine individuelle Beratung, eine
            schonende Durchführung und eine sorgfältige Nachsorge.
          </p>
        </div>
      </section>

      {/* Gründe */}
      <section className="w-full bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#EEC16B]">
            Medizinische & kulturelle Gründe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-gray-700 text-lg leading-relaxed">
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <span className="mt-1 flex-shrink-0">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_6px_#EEC16B80] group-hover:drop-shadow-[0_0_12px_#EEC16B] transition-all" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#EEC16B" fillOpacity="0.18" />
                    <path d="M7 13.5l3 3 7-7" stroke="#EEC16B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span>Medizinische Indikationen (z. B. Phimose, chronische Entzündungen)</span>
              </div>
              <div className="flex items-start gap-3 group">
                <span className="mt-1 flex-shrink-0">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_6px_#EEC16B80] group-hover:drop-shadow-[0_0_12px_#EEC16B] transition-all" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#EEC16B" fillOpacity="0.18" />
                    <path d="M7 13.5l3 3 7-7" stroke="#EEC16B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span>Verbesserte Hygiene</span>
              </div>
              <div className="flex items-start gap-3 group">
                <span className="mt-1 flex-shrink-0">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_6px_#EEC16B80] group-hover:drop-shadow-[0_0_12px_#EEC16B] transition-all" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#EEC16B" fillOpacity="0.18" />
                    <path d="M7 13.5l3 3 7-7" stroke="#EEC16B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span>Reduktion bestimmter Infektionsrisiken</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <span className="mt-1 flex-shrink-0">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_6px_#EEC16B80] group-hover:drop-shadow-[0_0_12px_#EEC16B] transition-all" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#EEC16B" fillOpacity="0.18" />
                    <path d="M7 13.5l3 3 7-7" stroke="#EEC16B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span>Kulturelle und religiöse Gründe</span>
              </div>
              <div className="flex items-start gap-3 group">
                <span className="mt-1 flex-shrink-0">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_6px_#EEC16B80] group-hover:drop-shadow-[0_0_12px_#EEC16B] transition-all" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#EEC16B" fillOpacity="0.18" />
                    <path d="M7 13.5l3 3 7-7" stroke="#EEC16B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span>Familien- und Traditionshintergründe</span>
              </div>
              <div className="flex items-start gap-3 group">
                <span className="mt-1 flex-shrink-0">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_6px_#EEC16B80] group-hover:drop-shadow-[0_0_12px_#EEC16B] transition-all" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#EEC16B" fillOpacity="0.18" />
                    <path d="M7 13.5l3 3 7-7" stroke="#EEC16B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span>Durchführung nach individuellen Wünschen</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ablauf */}
      <section className="w-full bg-black text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#EEC16B]">
            Ablauf & Sicherheit
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-gray-300">
            Vor dem Eingriff erfolgt eine ausführliche Beratung, in der alle
            Fragen beantwortet werden. Der Eingriff selbst wird unter sterilen
            Bedingungen und mit schonender Anästhesie durchgeführt.  
            <br />
            <br />
            Wir legen größten Wert auf Sicherheit, Schmerzfreiheit und eine
            vertrauensvolle Atmosphäre für unsere Patientinnen und Patienten.
          </p>
        </div>
      </section>

      {/* Nachsorge */}
      <section className="w-full bg-white text-black py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#EEC16B]">
              Nachsorge & Betreuung
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Nach einer Beschneidung ist eine sorgfältige Nachsorge entscheidend.
              Wir begleiten Sie mit regelmäßigen Kontrollen und stehen für
              Fragen jederzeit zur Verfügung.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Ziel ist eine schnelle Heilung, bestmögliche Ergebnisse und
              größtmögliche Sicherheit. Bei Bedarf passen wir die Behandlung
              individuell an den Heilungsverlauf an.
            </p>
          </div>
          <div className="flex justify-center">
            <span className="w-40 h-40 relative block">
              <Image
                src="/images/p4-icon.png"
                alt="Beschneidung Symbol"
                fill
                sizes="160px"
                className="object-contain"
                priority
              />
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
