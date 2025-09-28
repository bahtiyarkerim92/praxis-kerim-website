import Image from "next/image";

export default function UeberUnsPage() {
  return (
    <main className="w-full">
      {/* Hero Bild */}
      <section className="relative w-screen h-screen min-h-[400px] overflow-hidden">
        <Image
          src="/images/chefaerzte.jpg"
          alt="Chefärzte Praxis Dr. Kerim"
          fill
          className="object-cover w-full h-full"
          priority
          sizes="100vw"
        />
  {/* Kein Titel, nur Bild */}
      </section>


      {/* Über die Praxis */}
      <section className="w-full bg-white text-black py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#EEC16B]">
            Wer wir sind
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-6">
            Die <span className="font-semibold text-[#EEC16B]">Praxis Dr. Kerim</span> steht für moderne, patientenorientierte hausärztliche Versorgung nach höchsten wissenschaftlichen Standards. Unser Ziel ist es, für Sie und Ihre Familie ein verlässlicher Partner in allen Gesundheitsfragen zu sein – von der Vorsorge über die Akutbehandlung bis zur langfristigen Betreuung chronischer Erkrankungen.
          </p>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-6">
            Unser internationales Ärzteteam vereint langjährige Erfahrung aus verschiedenen medizinischen Fachrichtungen. Wir setzen auf modernste Diagnostik, digitale Services und eine persönliche, empathische Betreuung. In unserer Praxis sind Sie nicht nur Patient, sondern Mensch – mit individuellen Bedürfnissen und Lebensumständen.
          </p>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Wir sprechen mehrere Sprachen und legen großen Wert auf eine offene, vertrauensvolle Kommunikation. Ihre Gesundheit und Ihr Wohlbefinden stehen bei uns im Mittelpunkt.
          </p>
        </div>
      </section>


      {/* Unsere Philosophie & Werte */}
      <section className="w-full bg-black text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#EEC16B]">
            Unsere Philosophie & Werte
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-gray-300 mb-6">
            Wir betrachten Gesundheit ganzheitlich: Vorsorge, schnelle Diagnostik und individuelle Therapie stehen bei uns im Mittelpunkt. Unser Anspruch ist es, modernste Medizin mit persönlicher Betreuung zu verbinden, sodass unsere Patientinnen und Patienten nicht nur medizinisch, sondern auch menschlich bestens versorgt sind.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-[#EEC16B] mb-2">Ganzheitlichkeit</h3>
              <p className="text-gray-300">Wir sehen den Menschen als Einheit aus Körper, Geist und Seele. Prävention, Diagnostik und Therapie werden individuell auf Sie abgestimmt.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-[#EEC16B] mb-2">Innovation</h3>
              <p className="text-gray-300">Wir nutzen moderne Technik, digitale Services und aktuelle wissenschaftliche Erkenntnisse für Ihre optimale Versorgung.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-[#EEC16B] mb-2">Empathie</h3>
              <p className="text-gray-300">Wir nehmen uns Zeit, hören zu und begegnen Ihnen mit Respekt und Wertschätzung – unabhängig von Herkunft, Alter oder Lebenssituation.</p>
            </div>
          </div>
        </div>
      </section>


      {/* Die Chefärzte */}
      <section className="w-full bg-white text-black py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[#EEC16B]">
            Die Chefärzte
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Dr. Bahtiyar Kerim */}
            <div className="flex flex-col items-center text-center">
              <span className="w-40 h-40 mb-6 block relative rounded-full overflow-hidden border-4 border-white shadow-md group-hover:shadow-[0_0_20px_#EEC16B] transition-all">
                <Image
                  src="/images/bahtiyar-kerim.png"
                  alt="Dr. med. Bahtiyar Kerim, MHBA"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'top', borderRadius: '9999px' }}
                  className="absolute inset-0 w-full h-full"
                  sizes="160px"
                  priority
                />
              </span>
              <h3 className="text-xl font-bold text-[#EEC16B] whitespace-nowrap">
                Dr. med. Bahtiyar Kerim, MHBA
              </h3>
              <p className="text-gray-700 mt-3 leading-relaxed">
                Facharzt für Allgemeinmedizin mit Spezialisierung auf <span className="font-semibold">internistische Diagnostik</span> und Notfallmedizin. Dr. Kerim ist bekannt für seine präzise Diagnostik, seine ruhige Art und seine Fähigkeit, auch in schwierigen Situationen einen kühlen Kopf zu bewahren. Er engagiert sich für die kontinuierliche Weiterbildung des Teams und die Einführung innovativer Behandlungsmethoden.
              </p>
              <ul className="text-gray-600 text-base mt-2 list-disc list-inside">
                <li>Langjährige Erfahrung in Klinik und Praxis</li>
                <li>Mitglied in mehreren medizinischen Fachgesellschaften</li>
                <li>Spricht Deutsch, Bulgarisch, Türkisch, Englisch, Serbo-Kroatisch</li>
              </ul>
            </div>

            {/* Dr. Ibrahim Kerim */}
            <div className="flex flex-col items-center text-center">
              <span className="w-40 h-40 mb-6 block relative rounded-full overflow-hidden border-4 border-white shadow-md group-hover:shadow-[0_0_20px_#EEC16B] transition-all">
                <Image
                  src="/images/ibrahim-kerim.png"
                  alt="Mag. med. univ. Sof. Ibrahim Kerim"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'top', borderRadius: '9999px' }}
                  className="absolute inset-0 w-full h-full"
                  sizes="160px"
                  priority
                />
              </span>
              <h3 className="text-xl font-bold text-[#EEC16B] whitespace-nowrap">
                Mag. med. univ. Sof. Ibrahim Kerim
              </h3>
              <p className="text-gray-700 mt-3 leading-relaxed">
                Facharzt für Allgemeinmedizin mit Schwerpunkt auf <span className="font-semibold">chirurgischen Eingriffen und Diagnostik</span>. Dr. Ibrahim Kerim verbindet präzises Arbeiten mit viel Einfühlungsvermögen. Seine Patienten schätzen seine offene Kommunikation und seine sorgfältige Nachsorge.
              </p>
              <ul className="text-gray-600 text-base mt-2 list-disc list-inside">
                <li>Erfahrung in ambulanter und stationärer Versorgung</li>
                <li>Regelmäßige Fortbildungen im Bereich Chirurgie</li>
                <li>Spricht Deutsch, Bulgarisch, Türkisch, Englisch, Serbo-Kroatisch</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ausstattung & Team */}
      <section className="w-full bg-gray-50 text-black py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#EEC16B]">
            Unsere Ausstattung & Team
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8">
            Unsere Praxis ist mit moderner Medizintechnik ausgestattet: Ultraschall, EKG, Lungenfunktion, digitales Röntgen und vieles mehr. Unser freundliches Team aus medizinischen Fachangestellten sorgt für einen reibungslosen Ablauf und eine angenehme Atmosphäre.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <span className="w-40 h-40 mb-4 block relative rounded-full overflow-hidden border-4 border-white shadow-md transition-all">
                <Image
                  src="/images/georg-rumin.png"
                  alt="Georg Rumin"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'top', borderRadius: '9999px' }}
                  className="absolute inset-0 w-full h-full"
                  sizes="160px"
                  priority
                />
              </span>
              <div className="font-semibold text-[#EEC16B]">Georg Rumin</div>
              <div className="text-gray-600 text-sm">Allgemeinmedizin / Akupunktur</div>
              <div className="text-gray-500 text-xs mt-1">Spricht Deutsch, Polnisch</div>
            </div>
            <div className="flex flex-col items-center">
              <span className="w-40 h-40 mb-4 block relative rounded-full overflow-hidden border-4 border-white shadow-md transition-all">
                <Image
                  src="/images/gunay-najafova.png"
                  alt="Günay Najafova"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'top', borderRadius: '9999px', transform: 'scale(1.3) translateY(-3%)' }}
                  className="absolute inset-0 w-full h-full"
                  sizes="160px"
                  priority
                />
              </span>
              <div className="font-semibold text-[#EEC16B]">Günay Najafova</div>
              <div className="text-gray-600 text-sm">Allgemeinmedizin</div>
              <div className="text-gray-500 text-xs mt-1">Spricht Deutsch, Türkisch, Aserbaidschanisch, Russisch</div>
            </div>
            <div className="flex flex-col items-center">
              <span className="w-40 h-40 mb-4 block relative rounded-full overflow-hidden border-4 border-white shadow-md transition-all">
                <Image
                  src="/images/bülent-alkan.png"
                  alt="Bülent Alkan"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'top', borderRadius: '9999px' }}
                  className="absolute inset-0 w-full h-full"
                  sizes="160px"
                  priority
                />
              </span>
              <div className="font-semibold text-[#EEC16B]">Bülent Alkan</div>
              <div className="text-gray-600 text-sm">Allgemeinmedizin</div>
              <div className="text-gray-500 text-xs mt-1">Spricht Bulgarisch, Türkisch, Deutsch</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
