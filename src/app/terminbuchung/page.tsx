
export const metadata = {
  title: "Terminbuchung – Praxis Dr. Kerim",
  description:
    "Unser neues Terminbuchungssystem wird aktuell entwickelt. Bis dahin erreichen Sie uns telefonisch, per E-Mail oder WhatsApp.",
};

export default function TerminbuchungPage() {
  return (
    <main className="w-full">
      {/* Hero */}
      <section className="relative w-full h-[200px] md:h-[260px] bg-gradient-to-r from-[#232526] to-[#181818] flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg text-center w-full">Terminbuchung</h1>
      </section>

      {/* Info Section */}
      <section className="w-full bg-white text-black py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#EEC16B]">
            Neues Buchungssystem im Aufbau
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-10">
            Wir arbeiten derzeit an einem neuen digitalen Terminbuchungssystem.
            <br />
            Bis dieses verfügbar ist, können Termine auf folgenden Wegen
            vereinbart werden:
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href="https://wa.me/DEIN_WHATSAPP_LINK"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-[#EEC16B] text-black font-bold shadow-lg hover:scale-110 hover:shadow-[0_0_20px_#EEC16B] transition-transform"
            >
              WhatsApp-Kanal
            </a>
            <a
              href="mailto:info@praxiskerim.de"
              className="px-6 py-3 rounded-full border-2 border-[#EEC16B] text-[#EEC16B] font-bold hover:bg-[#EEC16B] hover:text-black shadow-lg hover:scale-110 transition-transform"
            >
              E-Mail
            </a>
            <a
              href="tel:+4969870015360"
              className="px-6 py-3 rounded-full border-2 border-[#EEC16B] text-[#EEC16B] font-bold hover:bg-[#EEC16B] hover:text-black shadow-lg hover:scale-110 transition-transform"
            >
              Telefon: +49 69 870015360
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
