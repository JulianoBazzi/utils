import { nowIn } from './internal/timeZone.js';
import type { TimeZoneOptions } from './types.js';

/**
 * The current month as `YYYY-MM`, read in `timeZone` when given — the upper
 * bound for a "competência" field (see `isMonthString`).
 *
 * @example
 * getCurrentMonth() // "2026-07"
 * getCurrentMonth({ timeZone: "America/Sao_Paulo" }) // "2026-07"
 */
export function getCurrentMonth(options: TimeZoneOptions = {}): string {
  return nowIn(options.timeZone).format('YYYY-MM');
}
