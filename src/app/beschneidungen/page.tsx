
"use client";

import Image from "next/image";
import { useI18n } from '../../i18n';

export default function BeschneidungenPage() {
  const { t } = useI18n();
  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="w-full bg-white text-black p-0 m-0">
        <div className="relative w-full min-h-[320px] md:min-h-[480px] aspect-video flex items-center justify-center overflow-hidden">
                 <Image
                   src="/images/vid4-poster.png"
                   alt="Beschneidung Video Poster – Hausarztpraxis Offenbach"
                   fill
                   className="object-cover"
                   priority
                   quality={70}
                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                   placeholder="blur"
                   blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                   loading="eager"
                   fetchPriority="high"
                 />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white via-white/80 to-transparent h-24 pointer-events-none" />
        </div>
        <div className="max-w-6xl mx-auto px-6 text-center mt-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#EEC16B] mb-6">
            {t('beschneidungen.heroTitle')}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t('beschneidungen.heroText')}
          </p>
        </div>
      </section>

      {/* Gründe */}
      <section className="w-full bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#EEC16B]">
            {t('beschneidungen.reasonsTitle')}
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
                <span>{t('beschneidungen.reason1')}</span>
              </div>
              <div className="flex items-start gap-3 group">
                <span className="mt-1 flex-shrink-0">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_6px_#EEC16B80] group-hover:drop-shadow-[0_0_12px_#EEC16B] transition-all" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#EEC16B" fillOpacity="0.18" />
                    <path d="M7 13.5l3 3 7-7" stroke="#EEC16B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span>{t('beschneidungen.reason2')}</span>
              </div>
              <div className="flex items-start gap-3 group">
                <span className="mt-1 flex-shrink-0">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_6px_#EEC16B80] group-hover:drop-shadow-[0_0_12px_#EEC16B] transition-all" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#EEC16B" fillOpacity="0.18" />
                    <path d="M7 13.5l3 3 7-7" stroke="#EEC16B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span>{t('beschneidungen.reason3')}</span>
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
                <span>{t('beschneidungen.reason4')}</span>
              </div>
              <div className="flex items-start gap-3 group">
                <span className="mt-1 flex-shrink-0">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_6px_#EEC16B80] group-hover:drop-shadow-[0_0_12px_#EEC16B] transition-all" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#EEC16B" fillOpacity="0.18" />
                    <path d="M7 13.5l3 3 7-7" stroke="#EEC16B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span>{t('beschneidungen.reason5')}</span>
              </div>
              <div className="flex items-start gap-3 group">
                <span className="mt-1 flex-shrink-0">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_6px_#EEC16B80] group-hover:drop-shadow-[0_0_12px_#EEC16B] transition-all" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#EEC16B" fillOpacity="0.18" />
                    <path d="M7 13.5l3 3 7-7" stroke="#EEC16B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span>{t('beschneidungen.reason6')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ablauf */}
      <section className="w-full bg-black text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#EEC16B]">
            {t('beschneidungen.processTitle')}
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-gray-300">
            {t('beschneidungen.processText')}
          </p>
        </div>
      </section>

      {/* Nachsorge */}
      <section className="w-full bg-white text-black py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#EEC16B]">
              {t('beschneidungen.aftercareTitle')}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              {t('beschneidungen.aftercareText1')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('beschneidungen.aftercareText2')}
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
