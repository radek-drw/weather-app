import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import deTranslations from './translations/de.json';
import enTranslations from './translations/en.json';
import esTranslations from './translations/es.json';
import frTranslations from './translations/fr.json';
import itTranslations from './translations/it.json';
import plTranslations from './translations/pl.json';
import ptTranslations from './translations/pt.json';

type TranslationResource = typeof enTranslations;

const resources: { [key: string]: { translation: TranslationResource } } = {
  de: { translation: deTranslations },
  en: { translation: enTranslations },
  es: { translation: esTranslations },
  fr: { translation: frTranslations },
  it: { translation: itTranslations },
  pl: { translation: plTranslations },
  pt: { translation: ptTranslations },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;