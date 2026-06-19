import dayjs from 'dayjs';
import 'dayjs/locale/pt-br.js';

/**
 * Format a date as `"D/M - Ddd"` with a capitalized Portuguese weekday
 * abbreviation (e.g. `"5/6 - Sáb"`). Returns an empty string for missing input.
 *
 * The pt-br locale is applied per-instance, so it never mutates the consumer's
 * global dayjs configuration.
 *
 * @example
 * formatWeekDay("2024-06-15") // "15/6 - Sáb"
 */
export function formatWeekDay(date?: string): string {
  if (!date) return '';

  const formatted = dayjs(date).locale('pt-br').format('D/M - ddd');
  const [day, weekDay] = formatted.split(' - ');

  if (!weekDay) return formatted;

  return `${day} - ${weekDay.charAt(0).toUpperCase()}${weekDay.slice(1)}`;
}
