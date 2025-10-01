
"use client";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white py-12 mt-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo + Beschreibung */}
  <div className="flex flex-col items-center md:items-start md:ml-8">
            <Image
              src="/images/logo.png" // dein Logo hier im public/images Ordner
              alt="Praxis Dr. Kerim"
              width={96}
              height={96}
              className="w-16 sm:w-20 md:w-24 h-auto mb-4"
              priority
            />
          <p className="text-gray-400 text-sm text-center md:text-left">
            Moderne hausärztliche Versorgung<br />
            nach höchsten Standards.
          </p>
        </div>

        {/* Öffnungszeiten */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-bold mb-3 text-[#EEC16B]">Öffnungszeiten</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              Mo–Do: 07:30–12:00 & 14:30–18:00
            </li>
            <li>
              Fr: 07:30–12:00 (nur Videosprechstunde)
            </li>
          </ul>
        </div>

  {/* Kontakt wieder linksbündig */}
  <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-bold mb-3 text-[#EEC16B]">Kontakt</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <a
                href="tel:+4969870015360"
                className="hover:text-[#EEC16B] transition-colors"
              >
                T: +49 69 870015360
              </a>
            </li>
            <li>
              <a
                href="tel:+4969842081"
                className="hover:text-[#EEC16B] transition-colors"
              >
                T: +49 69 84 20 81
              </a>
            </li>
            <li>
              <a
                href="fax:+4969844972"
                className="hover:text-[#EEC16B] transition-colors"
              >
                F: +49 69 84 49 72
              </a>
            </li>
            <li>
              <a
                href="mailto:info@praxiskerim.de"
                className="hover:text-[#EEC16B] transition-colors"
              >
                info@praxiskerim.de
              </a>
            </li>
          </ul>
        </div>

        {/* Adresse */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-bold mb-3 text-[#EEC16B]">Adresse</h3>
          <a
            href="https://maps.app.goo.gl/jpgJxAfiU59x1GHGA"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 text-sm hover:text-[#EEC16B] transition-colors text-center md:text-left block"
          >
            Jacques-Offenbach-Straße 12<br />
            63069 Offenbach am Main
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Praxis Dr. Kerim – Alle Rechte vorbehalten
      </div>
    </footer>
  );
}
