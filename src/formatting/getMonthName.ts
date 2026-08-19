import dayjs from 'dayjs';
import 'dayjs/locale/pt-br.js';
import { applyCasing, type LetterCasing } from './applyCasing.js';

interface GetMonthNameOptions {
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
export function getMonthName(
  value?: string | Date | null,
  options: GetMonthNameOptions = {},
): string {
  const { short = false, fallback = '', casing } = options;
  if (!value) return fallback;

  const date = dayjs(value).locale('pt-br');
  if (!date.isValid()) return fallback;

  const name = date.format(short ? 'MMM' : 'MMMM');
  const capitalized = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;

  return applyCasing(capitalized, casing);
}
