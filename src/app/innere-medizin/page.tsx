"use client";
import Image from "next/image";

export default function InnereMedizinPage() {
  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="w-full bg-white text-black p-0 m-0">
        <div className="relative w-full aspect-video bg-black flex items-center justify-center">
          <div className="relative w-full h-0" style={{paddingBottom: '56.25%'}}>
            <Image
              src="/images/slider-poster2.png"
              alt="Innere Medizin Hero"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white via-white/80 to-transparent h-24 pointer-events-none" />
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 text-center mt-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#EEC16B] mb-6">
            Innere Medizin
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Unsere Abteilung für Innere Medizin vereint modernste Diagnostik,
            fundierte Erfahrung und individuelle Betreuung. Wir kümmern uns um
            Erkrankungen der inneren Organe wie Herz, Lunge, Leber, Nieren und
            Stoffwechsel – von akuten Beschwerden bis zur Langzeittherapie.
          </p>
        </div>
      </section>

      {/* Diagnostik Section */}
      <section className="w-full bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#EEC16B]">
            Diagnostik & Funktionsuntersuchungen
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
                <span>EKG und Langzeit-EKG</span>
              </div>
              <div className="flex items-start gap-3 group">
                <span className="mt-1 flex-shrink-0">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_6px_#EEC16B80] group-hover:drop-shadow-[0_0_12px_#EEC16B] transition-all" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#EEC16B" fillOpacity="0.18" />
                    <path d="M7 13.5l3 3 7-7" stroke="#EEC16B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span>24-Stunden-Blutdruckmessung</span>
              </div>
              <div className="flex items-start gap-3 group">
                <span className="mt-1 flex-shrink-0">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_6px_#EEC16B80] group-hover:drop-shadow-[0_0_12px_#EEC16B] transition-all" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#EEC16B" fillOpacity="0.18" />
                    <path d="M7 13.5l3 3 7-7" stroke="#EEC16B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span>Lungenfunktionsprüfung (Spirometrie)</span>
              </div>
              <div className="flex items-start gap-3 group">
                <span className="mt-1 flex-shrink-0">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_6px_#EEC16B80] group-hover:drop-shadow-[0_0_12px_#EEC16B] transition-all" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#EEC16B" fillOpacity="0.18" />
                    <path d="M7 13.5l3 3 7-7" stroke="#EEC16B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span>Belastungsuntersuchungen</span>
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
                <span>Ultraschall (Sonografie) von Bauchorganen und Schilddrüse</span>
              </div>
              <div className="flex items-start gap-3 group">
                <span className="mt-1 flex-shrink-0">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_6px_#EEC16B80] group-hover:drop-shadow-[0_0_12px_#EEC16B] transition-all" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#EEC16B" fillOpacity="0.18" />
                    <path d="M7 13.5l3 3 7-7" stroke="#EEC16B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span>Blutuntersuchungen im hauseigenen Labor</span>
              </div>
              <div className="flex items-start gap-3 group">
                <span className="mt-1 flex-shrink-0">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_6px_#EEC16B80] group-hover:drop-shadow-[0_0_12px_#EEC16B] transition-all" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#EEC16B" fillOpacity="0.18" />
                    <path d="M7 13.5l3 3 7-7" stroke="#EEC16B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span>Herz-Kreislauf-Diagnostik</span>
              </div>
              <div className="flex items-start gap-3 group">
                <span className="mt-1 flex-shrink-0">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_6px_#EEC16B80] group-hover:drop-shadow-[0_0_12px_#EEC16B] transition-all" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#EEC16B" fillOpacity="0.18" />
                    <path d="M7 13.5l3 3 7-7" stroke="#EEC16B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span>Vorsorgeuntersuchungen nach Leitlinien</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vorsorge Section */}
      <section className="w-full bg-black text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#EEC16B]">
            Vorsorge & Früherkennung
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-gray-300">
            Krankheiten wie Bluthochdruck, Diabetes oder Herzrhythmusstörungen
            entwickeln sich oft schleichend. Regelmäßige Vorsorgeuntersuchungen
            sind daher der Schlüssel zur frühzeitigen Erkennung.  
            <br />
            <br />
            Wir bieten Check-ups, Screeningprogramme und Beratungen zu Risikofaktoren
            an – damit Sie langfristig gesund bleiben.
          </p>
        </div>
      </section>

      {/* Therapie Section */}
      <section className="w-full bg-white text-black py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#EEC16B]">
              Therapie & Langzeitbetreuung
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Wir begleiten unsere Patientinnen und Patienten nicht nur bei
              akuten Erkrankungen, sondern auch bei chronischen Verläufen.
              Dabei entwickeln wir individuelle Therapiepläne und passen diese
              regelmäßig an den aktuellen Gesundheitszustand an.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Bei komplexen Krankheitsbildern arbeiten wir eng mit
              Fachspezialisten zusammen, um eine optimale Versorgung zu
              gewährleisten. So stellen wir sicher, dass Sie langfristig die
              bestmögliche medizinische Betreuung erhalten.
            </p>
          </div>
          <div className="flex justify-center">
            <span className="w-40 h-40 relative block">
              <Image
                src="/images/p2-icon.png"
                alt="Innere Medizin Symbol"
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
