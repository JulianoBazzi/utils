import 'dayjs/locale/pt-br.js';
import { parseDate } from '../date/internal/parseDate.js';
import type { DateInput, TimeZoneOptions } from '../date/types.js';
import { applyCasing, type LetterCasing } from './applyCasing.js';
import { capitalize } from './internal/casing.js';

export interface GetWeekDayNameOptions extends TimeZoneOptions {
  /** Use the short form (`"Sáb"`) instead of the full name. Defaults to `false`. */
  short?: boolean;
  /** Returned when the input is empty/invalid. Defaults to `""`. */
  fallback?: string;
  /** Letter casing of the output. Defaults to a capitalized first letter. */
  casing?: LetterCasing;
}

/**
 * Portuguese weekday name for a date. Unlike {@link formatWeekDay}, which
 * renders `"15/6 - Sáb"`, this returns the weekday on its own.
 *
 * The pt-br locale is applied per-instance, so it never mutates the consumer's
 * global dayjs configuration.
 *
 * @example
 * getWeekDayName("2026-07-11") // "Sábado"
 * getWeekDayName("2026-07-11", { short: true }) // "Sáb"
 * getWeekDayName("2026-07-11", { short: true, casing: "lowercase" }) // "sáb"
 * getWeekDayName(null, { fallback: "Não Informado" }) // "Não Informado"
 */
export function getWeekDayName(value?: DateInput, options: GetWeekDayNameOptions = {}): string {
  const { short = false, fallback = '', casing, timeZone } = options;
  const parsed = parseDate(value, { timeZone });
  if (!parsed) return fallback;

  const date = parsed.locale('pt-br');

  const name = date.format(short ? 'ddd' : 'dddd');
  return applyCasing(capitalize(name), casing);
}
