import { parseDate } from '../date/internal/parseDate.js';
import type { DateInput, TimeZoneOptions } from '../date/types.js';

export interface FormatMonthOptions extends TimeZoneOptions {
  /** Returned when the input is empty or not a real date. Defaults to `""`. */
  fallback?: string;
}

/**
 * Format a date as `MM/YYYY`. Missing or invalid input → `fallback`.
 *
 * @example
 * formatMonth("2024-01-02") // "01/2024"
 * formatMonth("2024-01") // "01/2024"
 * formatMonth(null, { fallback: "Não Informado" }) // "Não Informado"
 */
export function formatMonth(value?: DateInput, options: FormatMonthOptions = {}): string {
  const { fallback = '', timeZone } = options;
  const date = parseDate(value, { timeZone });
  return date ? date.format('MM/YYYY') : fallback;
}
