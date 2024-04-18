import { Locale } from "discord.js";
import { getLocaleTexts } from "../texts";
import texts from "./texts.json";

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type WeekdayOption<T> = {
  name: string;
  name_localizations: Partial<Record<Locale, string>>;
  value: T;
};

export type WeekdayOptionArray<T> = WeekdayOption<T>[];

export function getWeekdayText(weekday: Weekday, locale: Locale): string {
  const localeTexts = getLocaleTexts(texts, locale);

  return localeTexts[weekday];
}

export function getWeekdayIntegerChoices(): WeekdayOptionArray<number> {
  return Array.from({ length: 7 }, (_, i) => ({
    name: texts["en-US"][i as Weekday],
    name_localizations: Object.fromEntries(
      Object.entries(texts).map(([locale, value]) => [
        locale as Locale,
        value[i as Weekday],
      ])
    ),
    value: i,
  }));
}
