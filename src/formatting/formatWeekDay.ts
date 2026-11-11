import 'dayjs/locale/pt-br.js';
import { parseDate } from '../date/internal/parseDate.js';
import type { DateInput, TimeZoneOptions } from '../date/types.js';
import { applyCasing, type LetterCasing } from './applyCasing.js';
import { capitalize } from './internal/casing.js';

export interface FormatWeekDayOptions extends TimeZoneOptions {
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
 * `dateFormat`. Missing or invalid input → `fallback`.
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
export function formatWeekDay(date?: DateInput, options: FormatWeekDayOptions = {}): string {
  const { fallback = '', casing, dateFormat = 'D/M', timeZone } = options;
  const parsed = parseDate(date, { timeZone });
  if (!parsed) return fallback;

  const instance = parsed.locale('pt-br');

  const datePart = instance.format(dateFormat);
  const weekday = instance.format('ddd');

  return applyCasing(`${datePart} - ${capitalize(weekday)}`, casing);
}
