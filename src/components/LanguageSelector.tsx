import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

const languages = [
  { code: 'es', name: 'ES' },
  { code: 'en', name: 'EN' },
  { code: 'zh', name: '中文' },
  { code: 'vi', name: 'Tiếng Việt' },
  { code: 'tl', name: 'Tagalog' },
  { code: 'ar', name: 'العربية' }
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('preferred-language', langCode);
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={i18n.language === lang.code ? "default" : "outline"}
          size="sm"
          onClick={() => changeLanguage(lang.code)}
          className="min-w-[60px] text-xs px-2 py-1"
        >
          {lang.name}
        </Button>
      ))}
    </div>
  );
};

export default LanguageSelector;
