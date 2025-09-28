"use client";



import Link from "next/link";
import { useI18n } from '../i18n';

export default function AboutSection() {
  const { t } = useI18n();
  return (
    <section className="w-full bg-black text-white py-20">
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Titel */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          {t('about.title')}
        </h2>
        <div className="w-28 h-1 bg-[#EEC16B] mx-auto rounded-full mb-10 shadow-[0_0_20px_#EEC16B]" />

        {/* Text */}
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-12">
          {t('about.description')}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link
            href="/bestellung"
            className="px-6 py-3 rounded-full bg-[#EEC16B] text-black font-bold \
                       shadow-lg hover:scale-110 hover:shadow-[0_0_20px_#EEC16B] transition-transform"
          >
            {t('about.orderForm')}
          </Link>
          <a
            href="https://wa.me/message/36BZWKZMJIWKG1"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full border-2 border-[#EEC16B] text-[#EEC16B] font-bold \
                       hover:bg-[#EEC16B] hover:text-black shadow-lg hover:scale-110 \
                       hover:shadow-[0_0_20px_#EEC16B] transition-transform"
          >
            {t('about.whatsappChannel')}
          </a>
        </div>
      </div>
    </section>
  );
}
