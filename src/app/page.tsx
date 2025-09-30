"use client";

import React from "react";
import Image from "next/image";
import VideoSlider from '../components/VideoSlider';
import LeistungenSection from '../components/LeistungenSection';
import { useI18n } from '../i18n';
import TeamSection from '../components/TeamSection'; // Importing TeamSection
import AboutSection from '../components/AboutSection'; // Importing AboutSection
// Removed SVG icon imports, using PNGs instead

export default function HomePage() {
  const { t } = useI18n();
  // VideoSlider no longer needs current, setCurrent, or handleEnded
  return (
    <div className="w-full">
      <VideoSlider />
      <section className="w-full bg-black text-white py-16">
        {/* Social icons with zoom tower effect */}
  <div className="flex justify-center mb-10 gap-4">
          <a
            href="https://www.facebook.com/people/Praxis-Dr-Kerim/100093582685712/"
            target="_blank"
            rel="noopener noreferrer"
            className="group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-1 group-hover:border-[#EEC16B] group-hover:shadow-lg group-hover:shadow-[0_0_15px_#EEC16B] group-hover:bg-black/80 group-hover:text-[#EEC16B] hover:scale-105 hover:shadow-[0_0_15px_#EEC16B]">
              <Image
                src="/images/facebook-circle.png"
                alt="Facebook"
                width={24}
                height={24}
                className="w-6 h-6 object-contain transition-transform duration-300 ease-out group-hover:scale-110"
                priority
              />
            </div>
          </a>
          <a
            href="https://www.linkedin.com/company/hausarztpraxis-dr-kerim/"
            target="_blank"
            rel="noopener noreferrer"
            className="group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-1 group-hover:border-[#EEC16B] group-hover:shadow-lg group-hover:shadow-[0_0_15px_#EEC16B] group-hover:bg-black/80 group-hover:text-[#EEC16B] hover:scale-105 hover:shadow-[0_0_15px_#EEC16B]">
              <Image
                src="/images/linkedin-circle.png"
                alt="LinkedIn"
                width={24}
                height={24}
                className="w-6 h-6 object-contain transition-transform duration-300 ease-out group-hover:scale-110"
                priority
              />
            </div>
          </a>
        </div>

        {/* Headline */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide mb-4">
            {t('homepage.title')}
          </h1>
          <div className="w-28 h-1 bg-[#EEC16B] mx-auto rounded-full mb-6"></div>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            {t('homepage.subtitle')}
          </p>
        </div>

        {/* Info Cards with zoom tower effect */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {/* Öffnungszeiten */}
          <div className="bg-gradient-to-b from-[#232526] to-[#181818] border border-gray-800 rounded-2xl shadow-xl flex flex-col items-center p-8 text-center transition-transform duration-300 ease-out hover:scale-110 hover:-translate-y-3 hover:shadow-[0_0_20px_#EEC16B]">
            <svg
              className="w-12 h-12 mb-4"
              fill="none"
              stroke="#EEC16B"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M8 7V3m8 4V3m-9 8h10m-12 8V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
            </svg>
            <h3 className="text-xl font-bold mb-3">{t('footer.openingHours')}</h3>
            <div className="space-y-2 text-gray-300">
              <p>{t('footer.opening.monThu')}</p>
              <div className="w-16 h-px bg-gray-600 mx-auto my-2"></div>
              <p><span className="whitespace-nowrap">{t('footer.opening.fri')}</span> <span className="whitespace-nowrap">({t('footer.opening.friNote')})</span></p>
            </div>
          </div>

          {/* Adresse */}
          <div className="bg-gradient-to-b from-[#232526] to-[#181818] border border-gray-800 rounded-2xl shadow-xl flex flex-col items-center p-8 text-center transition-transform duration-300 ease-out hover:scale-110 hover:-translate-y-3 hover:shadow-[0_0_20px_#EEC16B]">
            <svg
              className="w-12 h-12 mb-4"
              fill="none"
              stroke="#EEC16B"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 3v7m0 0L7.5 7.5M12 10l4.5-2.5M3 10.5V19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8.5" />
            </svg>
            <h3 className="text-xl font-bold mb-3">{t('footer.addressTitle')}</h3>
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
          <div className="bg-gradient-to-b from-[#232526] to-[#181818] border border-gray-800 rounded-2xl shadow-xl flex flex-col items-center p-8 text-center transition-transform duration-300 ease-out hover:scale-110 hover:-translate-y-3 hover:shadow-[0_0_20px_#EEC16B]">
            <svg
              className="w-12 h-12 mb-4"
              fill="none"
              stroke="#EEC16B"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8.5m18-4V7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6.5" />
            </svg>
            <h3 className="text-xl font-bold mb-3">{t('footer.contact')}</h3>
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
      </section>
  {/* WhatsApp-Kanal Button entfernt, Integration erfolgt in AboutSection */}
      <LeistungenSection />
      {/* TeamSection direkt unter LeistungenSection */}
      <TeamSection />
      {/* AboutSection direkt unter TeamSection */}
      <AboutSection />
    </div>
  );
}