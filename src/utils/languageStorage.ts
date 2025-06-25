const LANGUAGE_STORAGE_KEY = 'comunidad-segura-language';

export const saveLanguage = (language: string) => {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
};

export const getStoredLanguage = (): string | null => {
  return localStorage.getItem(LANGUAGE_STORAGE_KEY);
};

export const removeStoredLanguage = () => {
  localStorage.removeItem(LANGUAGE_STORAGE_KEY);
};
