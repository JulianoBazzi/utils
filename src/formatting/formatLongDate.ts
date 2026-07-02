import dayjs from 'dayjs';
import 'dayjs/locale/pt-br.js';
import { applyCasing, type LetterCasing } from './applyCasing.js';

interface FormatLongDateOptions {
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
export function formatLongDate(
  value?: string | Date | null,
  options: FormatLongDateOptions = {},
): string {
  const { fallback = '', casing } = options;
  if (!value) return fallback;

  const date = dayjs(value).locale('pt-br');
  if (!date.isValid()) return fallback;

  const day = date.date() === 1 ? '1º' : String(date.date());

  return applyCasing(`${day} de ${date.format('MMMM')} de ${date.year()}`, casing);
}
