import dayjs from 'dayjs';
import { parseDate } from '../date/internal/parseDate.js';
import type { DateInput } from '../date/types.js';
import { countLabel } from './internal/pluralize.js';

export interface FormatTimeAgoOptions {
  /** Returned when the input is empty/missing. Defaults to `""`. */
  fallback?: string;
}

/**
 * Format how long ago a date was, in Portuguese (e.g. `"5 dias"`, `"2 horas"`).
 * Picks the largest fitting unit (minutos → horas → dias → meses → anos).
 * Returns `fallback` for missing or invalid input; a future date reads as
 * `"1 minuto"` (the minimum unit). It measures the gap between two instants, so
 * the time zone does not matter and there is no `timeZone` option.
 *
 * @example
 * formatTimeAgo(dayjs().subtract(3, "day").toISOString()) // "3 dias"
 * formatTimeAgo(null, { fallback: "Não Informado" }) // "Não Informado"
 */
export function formatTimeAgo(date?: DateInput, options: FormatTimeAgoOptions = {}): string {
  const { fallback = '' } = options;
  const parsed = parseDate(date);
  if (!parsed) {
    return fallback;
  }

  const currentDate = dayjs();
  // Clamp future dates to "now" so the diffs below never go negative.
  const receivedDate = parsed.isAfter(currentDate) ? currentDate : parsed;

  // At least 1: a sub-minute (or future) gap still reads as "1 minuto".
  const formatDiff = (diff: number, singular: string, plural: string) =>
    countLabel(Math.max(diff, 1), singular, plural);

  const diffInMinutes = currentDate.diff(receivedDate, 'minute');
  if (diffInMinutes < 60) {
    return formatDiff(diffInMinutes, 'minuto', 'minutos');
  }

  const diffInHours = currentDate.diff(receivedDate, 'hour');
  if (diffInHours < 24) {
    return formatDiff(diffInHours, 'hora', 'horas');
  }

  const diffInDays = currentDate.diff(receivedDate, 'day');
  if (diffInDays < 30) {
    return formatDiff(diffInDays, 'dia', 'dias');
  }

  const diffInMonths = currentDate.diff(receivedDate, 'month');
  if (diffInMonths < 12) {
    return formatDiff(diffInMonths, 'mês', 'meses');
  }

  const diffInYears = currentDate.diff(receivedDate, 'year');
  return formatDiff(diffInYears, 'ano', 'anos');
}
