"use client";



import { motion } from "framer-motion";
import Image from "next/image";

import Link from "next/link";
import { useI18n } from '../i18n';


const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 50 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

export default function LeistungenSection() {
  const { t } = useI18n();


  // Only set motion props on desktop, none on mobile
  const motionProps = {
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true, amount: 0.3 },
    transition: { staggerChildren: 0.25 },
  };

  return (
  <section className="w-full bg-white text-black py-20">
      {/* Headline */}
      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide">
          {t('leistungen.title')}
        </h2>
        <div className="w-32 h-1 bg-[#EEC16B] mx-auto rounded-full mt-4 shadow-[0_0_15px_#EEC16B]" />
      </div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-7xl mx-auto px-6"
        {...motionProps}
      >
        {/* Allgemeinmedizin */}
        <Link href="/allgemeinmedizin">
          <motion.div
            variants={cardVariants}
            className="group bg-transparent rounded-2xl flex flex-col items-center p-10 text-center 
                       transition-transform duration-300 ease-out 
                       hover:scale-110 hover:-translate-y-4 hover:shadow-[0_0_25px_#EEC16B] cursor-pointer"
          >
            {/* TODO: Ersetze 'allgemein.png' durch dein Icon */}
            <span className="mb-6 w-44 h-44 relative block">
              <Image
                src="/images/p1-icon.png"
                alt="Allgemeinmedizin – Hausarzt Offenbach"
                fill
                sizes="80px"
                className="object-contain transition-transform duration-300 group-hover:scale-125"
                priority
              />
            </span>
            <h3 className="text-xl font-bold mb-3 text-[#EEC16B] group-hover:drop-shadow-lg">
              {t('leistungen.allgemeinmedizin.title')}
            </h3>
            <p className="text-gray-700">
              {t('leistungen.allgemeinmedizin.desc')}
            </p>
          </motion.div>
        </Link>

        {/* Innere Medizin */}
        <Link href="/innere-medizin">
          <motion.div
            variants={cardVariants}
            className="group bg-transparent rounded-2xl flex flex-col items-center p-10 text-center 
                       transition-transform duration-300 ease-out 
                       hover:scale-110 hover:-translate-y-4 hover:shadow-[0_0_25px_#EEC16B] cursor-pointer"
          >
            {/* TODO: Ersetze 'innere.png' */}
            <span className="mb-6 w-44 h-44 relative block">
              <Image
                src="/images/p2-icon.png"
                alt="Innere Medizin – Hausarztpraxis Offenbach"
                fill
                sizes="80px"
                className="object-contain transition-transform duration-300 group-hover:scale-125"
                priority
              />
            </span>
            <h3 className="text-xl font-bold mb-3 text-[#EEC16B] group-hover:drop-shadow-lg">
              {t('leistungen.innere.title')}
            </h3>
            <p className="text-gray-700">
              {t('leistungen.innere.desc')}
            </p>
          </motion.div>
        </Link>

        {/* Chirurgie */}
        <Link href="/chirurgie">
          <motion.div
            variants={cardVariants}
            className="group bg-transparent rounded-2xl flex flex-col items-center p-10 text-center 
                       transition-transform duration-300 ease-out 
                       hover:scale-110 hover:-translate-y-4 hover:shadow-[0_0_25px_#EEC16B] cursor-pointer"
          >
            {/* TODO: Ersetze 'chirurgie.png' */}
            <span className="mb-6 w-44 h-44 relative block">
              <Image
                src="/images/p3-icon.png"
                alt="Chirurgie – Hausarzt Offenbach"
                fill
                sizes="80px"
                className="object-contain transition-transform duration-300 group-hover:scale-125"
                priority
              />
            </span>
            <h3 className="text-xl font-bold mb-3 text-[#EEC16B] group-hover:drop-shadow-lg">
              {t('leistungen.chirurgie.title')}
            </h3>
            <p className="text-gray-700">
              {t('leistungen.chirurgie.desc')}
            </p>
          </motion.div>
        </Link>

        {/* Beschneidungen */}
        <Link href="/beschneidungen">
          <motion.div
            variants={cardVariants}
            className="group bg-transparent rounded-2xl flex flex-col items-center p-10 text-center 
                       transition-transform duration-300 ease-out 
                       hover:scale-110 hover:-translate-y-4 hover:shadow-[0_0_25px_#EEC16B] cursor-pointer"
          >
            {/* TODO: Ersetze 'beschneidung.png' */}
            <span className="mb-6 w-44 h-44 relative block">
              <Image
                src="/images/p4-icon.png"
                alt="Beschneidungen – Hausarztpraxis Offenbach"
                fill
                sizes="80px"
                className="object-contain transition-transform duration-300 group-hover:scale-125"
                priority
              />
            </span>
            <h3 className="text-xl font-bold mb-3 text-[#EEC16B] group-hover:drop-shadow-lg">
              {t('leistungen.beschneidungen.title')}
            </h3>
            <p className="text-gray-700">
              {t('leistungen.beschneidungen.desc')}
            </p>
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}
