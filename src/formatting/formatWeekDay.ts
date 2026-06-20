import dayjs from 'dayjs';
import 'dayjs/locale/pt-br.js';
import { applyCasing, type LetterCasing } from './applyCasing.js';

interface FormatWeekDayOptions {
  /** Returned when the input is empty/missing. Defaults to `""`. */
  fallback?: string;
  /** Letter casing of the output. Defaults to no transformation. */
  casing?: LetterCasing;
}

/**
 * Format a date as `"D/M - Ddd"` with a capitalized Portuguese weekday
 * abbreviation (e.g. `"5/6 - Sáb"`). Returns an empty string for missing input.
 *
 * The pt-br locale is applied per-instance, so it never mutates the consumer's
 * global dayjs configuration.
 *
 * @example
 * formatWeekDay("2024-06-15") // "15/6 - Sáb"
 * formatWeekDay("", { fallback: "Não Informado" }) // "Não Informado"
 * formatWeekDay("2024-06-15", { casing: "uppercase" }) // "15/6 - SÁB"
 */
export function formatWeekDay(date?: string | null, options: FormatWeekDayOptions = {}): string {
  const { fallback = '', casing } = options;
  if (!date) return fallback;

  const formatted = dayjs(date).locale('pt-br').format('D/M - ddd');
  const [day, weekDay] = formatted.split(' - ');

  if (!weekDay) return applyCasing(formatted, casing);

  return applyCasing(`${day} - ${weekDay.charAt(0).toUpperCase()}${weekDay.slice(1)}`, casing);
}
