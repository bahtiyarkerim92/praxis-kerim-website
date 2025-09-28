"use client";
import { useI18n } from "../../i18n";

export default function TerminBuchenPage() {
  const { t } = useI18n();
  return (
    <>
      <div className="max-w-2xl w-full mx-auto py-8 sm:py-12 px-2 sm:px-4">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">{t('appointment.title')}</h1>
        <p className="text-base sm:text-lg">{t('appointment.info')}</p>
      </div>
    </>
  );
}
