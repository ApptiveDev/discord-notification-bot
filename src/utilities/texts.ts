import { Locale } from "discord.js";

interface LocaleTextEntries<T extends Record<string, string>> {
  'en-US': T;
}

type LocaleTexts<T extends Record<string, string>> = LocaleTextEntries<T> & Partial<Record<Locale, T>>;

export function getLocaleTexts<T extends Record<string, string>>(texts: LocaleTexts<T>, locale: Locale): T {
  return texts[locale] || texts["en-US"];
}