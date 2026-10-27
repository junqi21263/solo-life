import type { zhHans } from './locales/zh-Hans';

export type MessageKey = keyof typeof zhHans;
export type Locale = 'zh-Hans' | 'zh-Hant' | 'en';
