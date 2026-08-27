import { en, LocaleKeys } from './en';
import { hi } from './hi';
import { bn } from './bn';
import { as } from './as';

export type { LocaleKeys };
export type LanguageCode = 'en' | 'hi' | 'bn' | 'as';

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' },
];

export const translations: Record<LanguageCode, Record<LocaleKeys, string>> = {
  en,
  hi,
  bn,
  as,
};
