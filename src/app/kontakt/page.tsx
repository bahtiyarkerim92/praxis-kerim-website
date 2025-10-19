"use client";

import Image from "next/image";
import { useI18n } from '../../i18n';
import TeamSection from '../../components/TeamSection';
import CalendarWidget from '../../components/CalendarWidget';

export default function KontaktPage() {
  const { t } = useI18n();
  return (
    <main className="w-full">
      {/* Kontaktinformationen mit Hintergrundbild */}
  <section className="w-full relative py-16 flex flex-col items-center justify-center overflow-hidden min-h-screen">
               <Image
                 src={process.env.NODE_ENV === 'development' ? "/images/kontakt.png" : "/images/kontakt.avif"}
                 alt="Kontakt Hintergrund"
                 fill
                 className="absolute left-0 top-0 w-full h-full min-w-full min-h-full object-cover opacity-70 z-0"
                 priority
                 sizes="100vw"
               />
        <div className="relative z-20 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 mt-32">
            {/* Öffnungszeiten */}
            <div className="bg-gradient-to-b from-[#232526] to-[#181818] border border-gray-800 rounded-2xl shadow-xl flex flex-col items-center p-8 text-center transition-transform duration-300 ease-out hover:scale-110 hover:-translate-y-3 hover:shadow-[0_0_20px_#EEC16B] z-30 opacity-70">
              <svg
                className="w-12 h-12 mb-4"
                fill="none"
                stroke="#EEC16B"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M8 7V3m8 4V3m-9 8h10m-12 8V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
              </svg>
              <h3 className="text-xl font-bold mb-3 text-[#EEC16B]">{t('footer.openingHours')}</h3>
              <div className="space-y-2 text-gray-300">
                <p>{t('footer.opening.monThu')}</p>
                <div className="w-16 h-px bg-gray-600 mx-auto my-2"></div>
                <p>{t('footer.opening.fri')}<br /><span className="block">({t('footer.opening.friNote')})</span></p>
              </div>
            </div>
            {/* Adresse */}
            <div className="bg-gradient-to-b from-[#232526] to-[#181818] border border-gray-800 rounded-2xl shadow-xl flex flex-col items-center p-8 text-center transition-transform duration-300 ease-out hover:scale-110 hover:-translate-y-3 hover:shadow-[0_0_20px_#EEC16B] z-30 opacity-70">
              <svg
                className="w-12 h-12 mb-4"
                fill="none"
                stroke="#EEC16B"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 3v7m0 0L7.5 7.5M12 10l4.5-2.5M3 10.5V19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8.5" />
              </svg>
              <h3 className="text-xl font-bold mb-3 text-[#EEC16B]">{t('footer.addressTitle')}</h3>
              <p className="text-gray-300">
                <a
                  href="https://maps.app.goo.gl/jpgJxAfiU59x1GHGA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#EEC16B] cursor-pointer"
                >
                  {t('footer.address1')}<br />{t('footer.address2')}
                </a>
              </p>
            </div>
            {/* Kontakt */}
            <div className="bg-gradient-to-b from-[#232526] to-[#181818] border border-gray-800 rounded-2xl shadow-xl flex flex-col items-center p-8 text-center transition-transform duration-300 ease-out hover:scale-110 hover:-translate-y-3 hover:shadow-[0_0_20px_#EEC16B] z-30 opacity-70">
              <svg
                className="w-12 h-12 mb-4"
                fill="none"
                stroke="#EEC16B"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8.5m18-4V7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6.5" />
              </svg>
              <h3 className="text-xl font-bold mb-3 text-[#EEC16B]">{t('footer.contact')}</h3>
              <div className="text-gray-300 space-y-1">
                <a href="tel:+4969870015360" className="block hover:text-[#EEC16B] cursor-pointer">
                  {t('footer.phone1')}
                </a>
                <a href="tel:+4969842081" className="block hover:text-[#EEC16B] cursor-pointer">
                  {t('footer.phone2')}
                </a>
                <a href="fax:+4969844972" className="block hover:text-[#EEC16B] cursor-pointer">
                  {t('footer.fax')}
                </a>
                <a href="mailto:info@praxiskerim.de" className="block hover:text-[#EEC16B] cursor-pointer">
                  {t('footer.email')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>



  {/* TeamSection wie auf Startseite */}
  <TeamSection />

      {/* Terminbuchung */}
  <section className="w-full bg-black text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#EEC16B]">
            {t('kontakt.appointmentTitle')}
          </h2>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-10">
            {t('kontakt.appointmentInfo')}
          </p>
          <a
            href="/terminbuchung"
            className="inline-block px-10 py-5 rounded-full bg-[#EEC16B] text-black font-bold shadow-lg hover:scale-110 hover:shadow-[0_0_30px_#EEC16B] transition-transform text-xl"
          >
            {t('nav.appointment')}
          </a>
        </div>
      </section>
      {/* Digitale Services ganz unten */}
      <section className="w-full bg-black text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#EEC16B]">
            {t('kontakt.digitalTitle')}
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-300 mb-12">
            {t('kontakt.digitalInfo')}
          </p>
          
          {/* Digital Services Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <a
              href="/bestellung"
              className="inline-block px-8 py-4 rounded-full bg-[#EEC16B] text-black font-bold shadow-lg hover:scale-110 hover:shadow-[0_0_20px_#EEC16B] transition-transform text-lg"
            >
              {t('about.orderForm')}
            </a>
            
            <a
              href="https://wa.me/message/36BZWKZMJIWKG1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 rounded-full border-2 border-[#EEC16B] text-[#EEC16B] font-bold hover:bg-[#EEC16B] hover:text-black shadow-lg hover:scale-110 hover:shadow-[0_0_20px_#EEC16B] transition-transform text-lg"
            >
              {t('about.whatsappChannel')}
            </a>
          </div>

        </div>
      </section>

      {/* Google Calendar Section - Eigene weiße Section */}
      <section className="w-full bg-white py-20 pb-0">
        <div className="w-full">
          <div className="text-center mb-12 max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
              {t('kontakt.calendarTitle')}
            </h2>
            <div className="w-24 h-1 bg-[#EEC16B] mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('kontakt.calendarInfo')}
            </p>
          </div>
          
          <div className="w-full">
            <CalendarWidget />
          </div>
        </div>
      </section>

        {/* Google Maps Karte ganz unten */}
        <section className="w-full bg-black flex justify-center items-center pt-0 py-0">
          <div className="w-full px-0">
            <div className="w-full rounded-none overflow-hidden shadow-lg border-t border-gray-800">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2559.993958910156!2d8.75859727672319!3d50.086399971524926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x45eed2c4c37d88e1%3A0x74433d274102b9a!2sHausarztpraxis%20Dr.%20Kerim!5e0!3m2!1sde!2sbg!4v1759055432525!5m2!1sde!2sbg"
                width="100%"
                height="600"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[400px] md:h-[600px]"
                title="Google Maps Praxis Dr. Kerim"
              ></iframe>
            </div>
          </div>
        </section>
      </main>
  );
}
