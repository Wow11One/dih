export enum ApplicationLanguages {
  English = 'en',
  French = 'fr',
  Ukrainian = 'ua',
  Spanish = 'es',
}

interface Locale {
  [key: string]: string;
}

export const locales: Locale = {
  [ApplicationLanguages.English]: 'en-US',
  [ApplicationLanguages.French]: 'fr-FR',
  [ApplicationLanguages.Ukrainian]: 'uk-UA',
  [ApplicationLanguages.Spanish]: 'es-ES',
};

export const DEFAULT_LANGUAGE = ApplicationLanguages.English;
