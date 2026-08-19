import dayjs from 'dayjs';

/** An inclusive date window, both ends formatted as `YYYY-MM-DD`. */
export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface GetDateRangeOptions {
  /** Date the window ends at. Defaults to today. */
  reference?: string | Date | null;
  /** Shift the end of the window back by this many days. Defaults to `0`. */
  offset?: number;
}

/**
 * Build an inclusive window of `days` days ending at `reference` — the shape
 * date-shortcut filters ("last 7 days") need. Both ends come out as `YYYY-MM-DD`.
 *
 * Use `offset` to move the whole window into the past: `{ offset: 1 }` ends it
 * yesterday instead of today. An unparseable `reference` yields
 * `"Invalid Date"` in both fields — validate upstream (e.g. `isDateString`).
 *
 * @example
 * getDateRange(1, { reference: "2026-07-21" }) // { startDate: "2026-07-21", endDate: "2026-07-21" }
 * getDateRange(7, { reference: "2026-07-21" }) // { startDate: "2026-07-15", endDate: "2026-07-21" }
 * getDateRange(1, { reference: "2026-07-21", offset: 1 }) // { startDate: "2026-07-20", endDate: "2026-07-20" }
 */
export function getDateRange(days: number, options: GetDateRangeOptions = {}): DateRange {
  const { reference, offset = 0 } = options;

  const end = (reference ? dayjs(reference) : dayjs()).subtract(offset, 'day');
  const span = days > 1 ? days - 1 : 0;

  return {
    startDate: end.subtract(span, 'day').format('YYYY-MM-DD'),
    endDate: end.format('YYYY-MM-DD'),
  };
}
