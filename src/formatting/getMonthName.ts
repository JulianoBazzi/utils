import 'dayjs/locale/pt-br.js';
import { parseDate } from '../date/internal/parseDate.js';
import type { DateInput, TimeZoneOptions } from '../date/types.js';
import { applyCasing, type LetterCasing } from './applyCasing.js';
import { capitalize } from './internal/casing.js';

export interface GetMonthNameOptions extends TimeZoneOptions {
  /** Use the 3-letter abbreviation (`"Jul"`) instead of the full name. Defaults to `false`. */
  short?: boolean;
  /** Returned when the input is empty/invalid. Defaults to `""`. */
  fallback?: string;
  /** Letter casing of the output. Defaults to a capitalized first letter. */
  casing?: LetterCasing;
}

/**
 * Portuguese month name for a date. Accepts a full date, a `YYYY-MM` string or
 * a `Date`. Capitalized by default; pass `casing` to override.
 *
 * The pt-br locale is applied per-instance, so it never mutates the consumer's
 * global dayjs configuration.
 *
 * @example
 * getMonthName("2026-07-15") // "Julho"
 * getMonthName("2026-07") // "Julho"
 * getMonthName("2026-07-15", { short: true }) // "Jul"
 * getMonthName("2026-07-15", { short: true, casing: "lowercase" }) // "jul"
 * getMonthName(null, { fallback: "Não Informado" }) // "Não Informado"
 */
export function getMonthName(value?: DateInput, options: GetMonthNameOptions = {}): string {
  const { short = false, fallback = '', casing, timeZone } = options;
  const parsed = parseDate(value, { timeZone });
  if (!parsed) return fallback;

  const date = parsed.locale('pt-br');

  const name = date.format(short ? 'MMM' : 'MMMM');
  return applyCasing(capitalize(name), casing);
}
