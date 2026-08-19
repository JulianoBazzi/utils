import dayjs from 'dayjs';
import 'dayjs/locale/pt-br.js';
import { applyCasing, type LetterCasing } from './applyCasing.js';

interface GetWeekDayNameOptions {
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
export function getWeekDayName(
  value?: string | Date | null,
  options: GetWeekDayNameOptions = {},
): string {
  const { short = false, fallback = '', casing } = options;
  if (!value) return fallback;

  const date = dayjs(value).locale('pt-br');
  if (!date.isValid()) return fallback;

  const name = date.format(short ? 'ddd' : 'dddd');
  const capitalized = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;

  return applyCasing(capitalized, casing);
}
