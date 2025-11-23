import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import hrTranslations from './croatian.json';
import enTranslations from './english.json';

i18n.use(initReactI18next).init({
  lng: 'hr',
  fallbackLng: 'hr',
  resources: {
    en: {
      translation: enTranslations,
    },
    hr: {
      translation: hrTranslations,
    },
  },
});
export default i18n;
