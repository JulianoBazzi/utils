import dayjs from 'dayjs';
import 'dayjs/locale/pt-br.js';
import { applyCasing, type LetterCasing } from './applyCasing.js';

interface FormatWeekDayOptions {
  /** Returned when the input is empty/missing. Defaults to `""`. */
  fallback?: string;
  /** Letter casing of the output. Defaults to no transformation. */
  casing?: LetterCasing;
  /** dayjs format for the date part. Defaults to `"D/M"`. */
  dateFormat?: string;
}

/**
 * Format a date as `"<date> - Ddd"` with a capitalized Portuguese weekday
 * abbreviation (e.g. `"15/6 - Sáb"`). The date part format is configurable via
 * `dateFormat`. Returns an empty string for missing input.
 *
 * The pt-br locale is applied per-instance, so it never mutates the consumer's
 * global dayjs configuration.
 *
 * @example
 * formatWeekDay("2024-06-15") // "15/6 - Sáb"
 * formatWeekDay("2024-06-15", { dateFormat: "DD/MM/YY" }) // "15/06/24 - Sáb"
 * formatWeekDay("", { fallback: "Não Informado" }) // "Não Informado"
 * formatWeekDay("2024-06-15", { casing: "uppercase" }) // "15/6 - SÁB"
 */
export function formatWeekDay(date?: string | null, options: FormatWeekDayOptions = {}): string {
  const { fallback = '', casing, dateFormat = 'D/M' } = options;
  if (!date) return fallback;

  const instance = dayjs(date).locale('pt-br');
  const datePart = instance.format(dateFormat);
  const weekday = instance.format('ddd');
  const weekdayCap = `${weekday.charAt(0).toUpperCase()}${weekday.slice(1)}`;

  return applyCasing(`${datePart} - ${weekdayCap}`, casing);
}
