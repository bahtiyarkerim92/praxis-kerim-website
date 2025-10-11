"use client";

import { useI18n } from '../../i18n';
import OrderForm from './OrderForm';

export default function BestellungPage() {
  const { t } = useI18n();
  return (
    <main className="w-full">
      {/* Hero */}
      <section className="relative w-full h-[200px] md:h-[260px] bg-gradient-to-r from-[#232526] to-[#181818] flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg text-center w-full px-4">
          {t('bestellung.heroTitle')}
        </h1>
      </section>

      {/* Order Form Section */}
      <section className="w-full bg-gray-50 text-black py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#EEC16B] mb-4">
              {t('bestellung.infoTitle')}
            </h2>
            <p className="text-gray-700">
              {t('bestellung.infoText')}
            </p>
          </div>
          <OrderForm onSuccess={() => {
            console.log("Order submitted successfully!");
          }} />
        </div>
      </section>
    </main>
  );
}
