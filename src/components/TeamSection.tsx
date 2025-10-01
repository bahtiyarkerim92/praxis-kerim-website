
"use client";
import Image from "next/image";


import { motion } from "framer-motion";
import { useI18n } from '../i18n';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 50 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

const team = [
  {
    name: "Dr. med. Bahtiyar Kerim, MHBA",
    role: "Allgemeinmedizin / Notfallmedizin",
    email: "bahtiyar.kerim@praxiskerim.de",
    image: "/images/bahtiyar-kerim.png"
  },
  {
    name: "Mag. med. univ. Sof. Ibrahim Kerim",
    role: "Allgemeinmedizin",
    email: "ibrahim.kerim@praxiskerim.de",
    image: "/images/ibrahim-kerim.png"
  },
  {
    name: "Georg Rumin",
    role: "Allgemeinmedizin / Akupunktur",
    email: "georg.rumin@praxiskerim.de",
    image: "/images/georg-rumin.png"
  },
  {
    name: "Günay Najafova",
    role: "Allgemeinmedizin",
  email: "gunay.najafova@praxiskerim.de",
    image: "/images/gunay-najafova.png"
  },
  {
    name: "Bülent Alkan",
    role: "Allgemeinmedizin",
  email: "bulent.alkan@praxiskerim.de",
    image: "/images/bülent-alkan.png"
  },
  {
    name: "M. Cem Samar",
    role: "Privatarzt – nur Videosprechstunde (Psychiatrie / Psychotherapie)",
    email: "cem.samar@praxiskerim.de",
    image: "/images/cem-samar.png"
  },
];

export default function TeamSection() {
  const { t } = useI18n();
  return (
    <section className="w-full bg-white text-black py-20">
      {/* Headline */}
      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide">
          {t('team.title')}
        </h2>
        <div className="w-32 h-1 bg-[#EEC16B] mx-auto rounded-full mt-4 shadow-[0_0_15px_#EEC16B]" />
      </div>
      {/* Grid */}
      <motion.div
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto px-6"
  initial={typeof window !== 'undefined' && window.innerWidth >= 768 ? 'hidden' : undefined}
  whileInView={typeof window !== 'undefined' && window.innerWidth >= 768 ? 'visible' : undefined}
  viewport={typeof window !== 'undefined' && window.innerWidth >= 768 ? { once: true, amount: 0.2 } : undefined}
  transition={typeof window !== 'undefined' && window.innerWidth >= 768 ? { staggerChildren: 0.25 } : undefined}
      >
        {team.map((doc, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="group bg-transparent rounded-2xl flex flex-col items-center p-8 text-center transition-transform duration-300 ease-out hover:scale-110 hover:-translate-y-4 hover:shadow-[0_0_25px_#EEC16B] cursor-pointer"
          >
            {doc.name === "Günay Najafova" ? (
              <span className="w-40 h-40 mb-6 block relative rounded-full overflow-hidden border-4 border-white shadow-md group-hover:shadow-[0_0_20px_#EEC16B] transition-all">
                <Image
                  src={doc.image}
                  alt={doc.name}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'top', borderRadius: '9999px' }}
                  className="absolute inset-0 w-full h-full scale-130 -translate-y-[10%]"
                  sizes="160px"
                  priority
                />
              </span>
            ) : (
              <Image
                src={doc.image}
                alt={doc.name}
                width={160}
                height={160}
                className="w-40 h-40 object-cover object-top rounded-full mb-6 border-4 border-white shadow-md group-hover:shadow-[0_0_20px_#EEC16B] transition-all"
                priority
              />
            )}
            <h3 className="text-xl font-bold mb-2 text-[#EEC16B] group-hover:drop-shadow-lg whitespace-nowrap">
              {t(`team.${index}.name`)}
            </h3>
            {doc.name === "M. Cem Samar" ? (
              <>
                <p className="text-gray-700 mb-1 font-semibold">{t('team.cem.role')}</p>
                <p className="text-gray-700 text-xs mb-1 mt-0 font-normal">{t('team.cem.note')}</p>
              </>
            ) : (
              <p className="text-gray-700 mb-2 font-semibold">{t(`team.${index}.role`)}</p>
            )}
            <a
              href={`mailto:${doc.email}`}
              className="text-sm text-blue-600 hover:underline"
            >
              {doc.email}
            </a>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
