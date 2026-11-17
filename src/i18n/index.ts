import { ar as arData } from './ar';
import { en as enData } from './en';
import { fr as frData } from './fr';
import { es as esData } from './es';
import { de as deData } from './de';
import { tr as trData } from './tr';
import { pt as ptData } from './pt';
import { hi as hiData } from './hi';
import { zh as zhData } from './zh';
import { ja as jaData } from './ja';
import type { Translations, LangCode } from './types';

export const translations: Record<LangCode, Translations> = {
  ar: arData,
  en: enData,
  fr: frData,
  es: esData,
  de: deData,
  tr: trData,
  pt: ptData,
  hi: hiData,
  zh: zhData,
  ja: jaData,
};

export type { LangCode, Translations, LanguageMeta } from './types';
