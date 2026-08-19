import dayjs from 'dayjs';
import type { DateRange } from './getDateRange.js';

export interface GetMonthRangeOptions {
  /** Upper bound for `endDate` — an ongoing month stops here. Defaults to today. */
  reference?: string | Date | null;
}

/**
 * Build the inclusive `YYYY-MM-DD` range covering a month. When the month is
 * still running, `endDate` is clamped to `reference` instead of the (future)
 * last day — so a filter never asks for dates that haven't happened yet.
 *
 * Accepts `"YYYY-MM"` or any full date within the month. An unparseable
 * `month` yields `"Invalid Date"` in both fields — validate upstream.
 *
 * @example
 * getMonthRange("2026-06", { reference: "2026-07-21" }) // { startDate: "2026-06-01", endDate: "2026-06-30" }
 * getMonthRange("2026-07", { reference: "2026-07-21" }) // { startDate: "2026-07-01", endDate: "2026-07-21" }
 */
export function getMonthRange(month: string, options: GetMonthRangeOptions = {}): DateRange {
  const { reference } = options;

  const start = dayjs(month).startOf('month');
  const endOfMonth = start.endOf('month');
  const limit = reference ? dayjs(reference) : dayjs();
  const end = endOfMonth.isAfter(limit) ? limit : endOfMonth;

  return {
    startDate: start.format('YYYY-MM-DD'),
    endDate: end.format('YYYY-MM-DD'),
  };
}
