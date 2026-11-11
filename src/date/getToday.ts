import { nowIn } from './internal/timeZone.js';
import type { TimeZoneOptions } from './types.js';

/**
 * Today's date as `YYYY-MM-DD`, read in `timeZone` when given. On a server
 * running in UTC, `getToday({ timeZone: "America/Sao_Paulo" })` still returns
 * the Brazilian date after 21:00 — no dayjs plugin needed.
 *
 * @example
 * getToday() // "2026-07-21" (runtime time zone)
 * getToday({ timeZone: "America/Sao_Paulo" }) // "2026-07-21"
 */
export function getToday(options: TimeZoneOptions = {}): string {
  return nowIn(options.timeZone).format('YYYY-MM-DD');
}
