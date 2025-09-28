export function useI18n(): { t: (key: string) => string; lang: string; setLang: (lang: string) => void };
export function I18nProvider(props: { children: React.ReactNode }): JSX.Element;
