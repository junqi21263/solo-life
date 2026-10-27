import { en } from './locales/en';
import { zhHans } from './locales/zh-Hans';
import { zhHant } from './locales/zh-Hant';
import type { Locale, MessageKey } from './types';

const messages = { 'zh-Hans': zhHans, 'zh-Hant': zhHant, en };

export function t(locale: Locale, key: MessageKey): string {
  return messages[locale][key];
}

export type { Locale, MessageKey } from './types';
