import type { DateRange } from './getDateRange.js';
import { parseDate } from './internal/parseDate.js';
import { nowIn } from './internal/timeZone.js';
import type { DateInput, TimeZoneOptions } from './types.js';

export interface GetMonthRangeOptions extends TimeZoneOptions {
  /** Upper bound for `endDate` — an ongoing month stops here. Defaults to today. */
  reference?: DateInput;
}

/**
 * Build the inclusive `YYYY-MM-DD` range covering a month. When the month is
 * still running, `endDate` is clamped to `reference` instead of the (future)
 * last day — so a filter never asks for dates that haven't happened yet.
 *
 * - A month that starts after `reference` comes back whole; the range is
 *   never inverted.
 * - Accepts `"YYYY-MM"`, any date within the month, `Date` or `Dayjs`. Input
 *   that is not a real date yields empty strings in both fields.
 *
 * @example
 * getMonthRange("2026-06", { reference: "2026-07-21" }) // { startDate: "2026-06-01", endDate: "2026-06-30" }
 * getMonthRange("2026-07", { reference: "2026-07-21" }) // { startDate: "2026-07-01", endDate: "2026-07-21" }
 * getMonthRange("2026-09", { reference: "2026-07-21" }) // { startDate: "2026-09-01", endDate: "2026-09-30" }
 */
export function getMonthRange(month: DateInput, options: GetMonthRangeOptions = {}): DateRange {
  const { reference, timeZone } = options;

  const parsed = parseDate(month, { timeZone });
  const limit = reference ? parseDate(reference, { timeZone }) : nowIn(timeZone);
  if (!parsed || !limit) {
    return { startDate: '', endDate: '' };
  }

  const start = parsed.startOf('month');
  const endOfMonth = start.endOf('month');
  const end = endOfMonth.isAfter(limit) && !start.isAfter(limit) ? limit : endOfMonth;

  return {
    startDate: start.format('YYYY-MM-DD'),
    endDate: end.format('YYYY-MM-DD'),
  };
}
