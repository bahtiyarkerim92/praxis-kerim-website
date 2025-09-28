
"use client";
import Image from "next/image";

export default function ChirurgiePage() {
  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="w-full bg-white text-black p-0 m-0">
        <div className="relative w-full aspect-video bg-black flex items-center justify-center">
          <div className="relative w-full h-0" style={{paddingBottom: '56.25%'}}>
            <Image
              src="/images/slider-poster3.png"
              alt="Chirurgie Hero"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white via-white/80 to-transparent h-24 pointer-events-none" />
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 text-center mt-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#EEC16B] mb-6">
            Chirurgie
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            In unserer Praxis bieten wir eine breite Palette kleiner chirurgischer
            Eingriffe an. Von der Wundversorgung bis zu Gelenkinjektionen – wir
            versorgen Sie direkt vor Ort nach höchsten medizinischen Standards.
          </p>
        </div>
      </section>

      {/* Kleine Eingriffe */}
      <section className="w-full bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#EEC16B]">
            Kleine chirurgische Eingriffe
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
                <span>Entfernung von Hautveränderungen (z. B. Warzen, Muttermale)</span>
              </div>
              <div className="flex items-start gap-3 group">
                <span className="mt-1 flex-shrink-0">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_6px_#EEC16B80] group-hover:drop-shadow-[0_0_12px_#EEC16B] transition-all" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#EEC16B" fillOpacity="0.18" />
                    <path d="M7 13.5l3 3 7-7" stroke="#EEC16B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span>Behandlung von Abszessen und Entzündungen</span>
              </div>
              <div className="flex items-start gap-3 group">
                <span className="mt-1 flex-shrink-0">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_6px_#EEC16B80] group-hover:drop-shadow-[0_0_12px_#EEC16B] transition-all" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#EEC16B" fillOpacity="0.18" />
                    <path d="M7 13.5l3 3 7-7" stroke="#EEC16B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span>Versorgung kleiner Schnitt- und Platzwunden</span>
              </div>
              <div className="flex items-start gap-3 group">
                <span className="mt-1 flex-shrink-0">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_6px_#EEC16B80] group-hover:drop-shadow-[0_0_12px_#EEC16B] transition-all" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#EEC16B" fillOpacity="0.18" />
                    <path d="M7 13.5l3 3 7-7" stroke="#EEC16B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span>Abtragung von Lipomen und Zysten</span>
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
                <span>Nagelchirurgie (z. B. eingewachsene Nägel)</span>
              </div>
              <div className="flex items-start gap-3 group">
                <span className="mt-1 flex-shrink-0">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_6px_#EEC16B80] group-hover:drop-shadow-[0_0_12px_#EEC16B] transition-all" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#EEC16B" fillOpacity="0.18" />
                    <path d="M7 13.5l3 3 7-7" stroke="#EEC16B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span>Kleinere Gewebeproben (Biopsien)</span>
              </div>
              <div className="flex items-start gap-3 group">
                <span className="mt-1 flex-shrink-0">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_6px_#EEC16B80] group-hover:drop-shadow-[0_0_12px_#EEC16B] transition-all" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#EEC16B" fillOpacity="0.18" />
                    <path d="M7 13.5l3 3 7-7" stroke="#EEC16B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span>Versorgung nach kleineren Unfällen</span>
              </div>
              <div className="flex items-start gap-3 group">
                <span className="mt-1 flex-shrink-0">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_6px_#EEC16B80] group-hover:drop-shadow-[0_0_12px_#EEC16B] transition-all" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#EEC16B" fillOpacity="0.18" />
                    <path d="M7 13.5l3 3 7-7" stroke="#EEC16B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span>Nachsorge nach ambulanten Eingriffen</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wundversorgung */}
      <section className="w-full bg-black text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#EEC16B]">
            Wundversorgung & chronische Wunden
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-gray-300">
            Akute und chronische Wunden erfordern eine fachgerechte, oft
            langfristige Behandlung. Wir versorgen Schnitt-, Riss- und
            Schürfwunden, kümmern uns um Verbrennungsverletzungen und führen
            moderne Wundtherapie bei chronischen Wunden (z. B. Ulkus cruris,
            diabetisches Fußsyndrom) durch.  
            <br />
            <br />
            Dabei setzen wir auf individuell abgestimmte Methoden und arbeiten
            eng mit Fachzentren zusammen, wenn eine weiterführende Versorgung
            nötig wird.
          </p>
        </div>
      </section>

      {/* Gelenkinjektionen */}
      <section className="w-full bg-white text-black py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#EEC16B]">
              Gelenkinjektionen & Nachsorge
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Schmerzen in Gelenken durch Arthrose, Entzündungen oder Verletzungen
              können mit gezielten Injektionen effektiv behandelt werden.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Wir bieten Gelenkinjektionen mit entzündungshemmenden Medikamenten
              oder Hyaluronsäure an und begleiten Sie während der gesamten
              Behandlung mit engmaschiger Kontrolle und Nachsorge.
            </p>
          </div>
          <div className="flex justify-center">
            <span className="w-40 h-40 relative block">
              <Image
                src="/images/p3-icon.png"
                alt="Chirurgische Versorgung"
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
