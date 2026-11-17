import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { translations } from './index';
import type { LangCode, Translations, LanguageMeta } from './types';

const STORAGE_KEY = 'control-language';

export const LANGUAGES: LanguageMeta[] = [
  { code: 'ar', nativeName: 'العربية', englishName: 'Arabic', flag: '🇸🇦', rtl: true },
  { code: 'en', nativeName: 'English', englishName: 'English', flag: '🇬🇧', rtl: false },
  { code: 'fr', nativeName: 'Français', englishName: 'French', flag: '🇫🇷', rtl: false },
  { code: 'es', nativeName: 'Español', englishName: 'Spanish', flag: '🇪🇸', rtl: false },
  { code: 'de', nativeName: 'Deutsch', englishName: 'German', flag: '🇩🇪', rtl: false },
  { code: 'tr', nativeName: 'Türkçe', englishName: 'Turkish', flag: '🇹🇷', rtl: false },
  { code: 'pt', nativeName: 'Português', englishName: 'Portuguese', flag: '🇵🇹', rtl: false },
  { code: 'hi', nativeName: 'हिन्दी', englishName: 'Hindi', flag: '🇮🇳', rtl: false },
  { code: 'zh', nativeName: '中文', englishName: 'Chinese', flag: '🇨🇳', rtl: false },
  { code: 'ja', nativeName: '日本語', englishName: 'Japanese', flag: '🇯🇵', rtl: false },
];

const DEFAULT_LANG: LangCode = 'ar';

interface LanguageContextValue {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  t: Translations;
  isRTL: boolean;
  languages: LanguageMeta[];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLang(): LangCode {
  if (typeof window === 'undefined') return DEFAULT_LANG;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && translations[stored as LangCode]) return stored as LangCode;
  return DEFAULT_LANG;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(getInitialLang);

  const meta = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];
  const isRTL = meta.rtl;

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.body.className = isRTL ? 'font-arabic' : 'font-default';
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang, isRTL]);

  const setLang = (newLang: LangCode) => setLangState(newLang);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang], isRTL, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
