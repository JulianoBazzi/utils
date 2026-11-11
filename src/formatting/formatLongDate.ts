import 'dayjs/locale/pt-br.js';
import { parseDate } from '../date/internal/parseDate.js';
import type { DateInput, TimeZoneOptions } from '../date/types.js';
import { applyCasing, type LetterCasing } from './applyCasing.js';

export interface FormatLongDateOptions extends TimeZoneOptions {
  /** Returned when the input is empty/invalid. Defaults to `""`. */
  fallback?: string;
  /** Optional casing applied to the result. */
  casing?: LetterCasing;
}

/**
 * Format a date in full Brazilian Portuguese, e.g. `1º de julho de 2026`
 * (day 1 gets the ordinal `º`).
 *
 * The pt-br locale is applied per-instance, so it never mutates the consumer's
 * global dayjs configuration.
 *
 * @example
 * formatLongDate("2026-07-01") // "1º de julho de 2026"
 * formatLongDate(new Date(2026, 6, 15)) // "15 de julho de 2026"
 * formatLongDate("2026-07-15", { casing: "uppercase" }) // "15 DE JULHO DE 2026"
 */
export function formatLongDate(value?: DateInput, options: FormatLongDateOptions = {}): string {
  const { fallback = '', casing, timeZone } = options;
  const parsed = parseDate(value, { timeZone });
  if (!parsed) return fallback;

  const date = parsed.locale('pt-br');

  const day = date.date() === 1 ? '1º' : String(date.date());

  return applyCasing(`${day} de ${date.format('MMMM')} de ${date.year()}`, casing);
}
