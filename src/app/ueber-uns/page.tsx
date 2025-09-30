"use client";
import Image from "next/image";
import { useI18n } from '../../i18n';

export default function UeberUnsPage() {
  const { t } = useI18n();
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
            {t('ueberuns.whoTitle')}
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-6">
            {t('ueberuns.whoText1')}
          </p>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-6">
            {t('ueberuns.whoText2')}
          </p>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            {t('ueberuns.whoText3')}
          </p>
        </div>
      </section>


      {/* Unsere Philosophie & Werte */}
      <section className="w-full bg-black text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#EEC16B]">
            {t('ueberuns.philosophieTitle')}
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-gray-300 mb-6">
            {t('ueberuns.philosophieText')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-[#EEC16B] mb-2">{t('ueberuns.value1Title')}</h3>
              <p className="text-gray-300">{t('ueberuns.value1Text')}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-[#EEC16B] mb-2">{t('ueberuns.value2Title')}</h3>
              <p className="text-gray-300">{t('ueberuns.value2Text')}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-[#EEC16B] mb-2">{t('ueberuns.value3Title')}</h3>
              <p className="text-gray-300">{t('ueberuns.value3Text')}</p>
            </div>
          </div>
        </div>
      </section>


      {/* Die Chefärzte */}
      <section className="w-full bg-white text-black py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[#EEC16B]">
            {t('ueberuns.chiefsTitle')}
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
                {t('ueberuns.chief1Name')}
              </h3>
              <p className="text-gray-700 mt-3 leading-relaxed">
                {t('ueberuns.chief1Text')}
              </p>
              <ul className="text-gray-600 text-base mt-2 list-disc list-inside">
                <li>{t('ueberuns.chief1List1')}</li>
                <li>{t('ueberuns.chief1List2')}</li>
                <li>{t('ueberuns.chief1List3')}</li>
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
                {t('ueberuns.chief2Name')}
              </h3>
              <p className="text-gray-700 mt-3 leading-relaxed">
                {t('ueberuns.chief2Text')}
              </p>
              <ul className="text-gray-600 text-base mt-2 list-disc list-inside">
                <li>{t('ueberuns.chief2List1')}</li>
                <li>{t('ueberuns.chief2List2')}</li>
                <li>{t('ueberuns.chief2List3')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ausstattung & Team */}
      <section className="w-full bg-gray-50 text-black py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#EEC16B]">
            {t('ueberuns.equipmentTitle')}
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8">
            {t('ueberuns.equipmentText')}
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
              <div className="font-semibold text-[#EEC16B]">{t('ueberuns.team1Name')}</div>
              <div className="text-gray-600 text-sm">{t('ueberuns.team1Role')}</div>
              <div className="text-gray-500 text-xs mt-1">{t('ueberuns.team1Lang')}</div>
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
              <div className="font-semibold text-[#EEC16B]">{t('ueberuns.team2Name')}</div>
              <div className="text-gray-600 text-sm">{t('ueberuns.team2Role')}</div>
              <div className="text-gray-500 text-xs mt-1">{t('ueberuns.team2Lang')}</div>
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
              <div className="font-semibold text-[#EEC16B]">{t('ueberuns.team3Name')}</div>
              <div className="text-gray-600 text-sm">{t('ueberuns.team3Role')}</div>
              <div className="text-gray-500 text-xs mt-1">{t('ueberuns.team3Lang')}</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
