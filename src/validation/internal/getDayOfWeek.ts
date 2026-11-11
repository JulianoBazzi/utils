import { parseDate } from '../../date/internal/parseDate.js';
import type { DateInput } from '../../date/types.js';

/**
 * Day of week index (0 = Sunday .. 6 = Saturday) for a date, or `null` for
 * missing/invalid input. Missing values are rejected before parsing, since
 * `dayjs(undefined)` would resolve to "now".
 *
 * @internal
 */
export function getDayOfWeek(value: DateInput, timeZone?: string): number | null {
  return parseDate(value, { timeZone })?.day() ?? null;
}
