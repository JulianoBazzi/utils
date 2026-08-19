import dayjs from 'dayjs';
import { getMonthName } from '../formatting/getMonthName.js';

/** A `{ id, name }` pair, the shape accepted by `findOptionById` / `getLabelById`. */
export interface MonthOption {
  /** Month identifier, `YYYY-MM`. */
  id: string;
  /** Human label, e.g. `"Julho/2026"`. */
  name: string;
}

export interface GetMonthOptionsOptions {
  /** How many months to generate. Defaults to `12`. */
  count?: number;
  /** Most recent month in the list. Defaults to today. */
  reference?: string | Date | null;
  /** Drop months earlier than this `YYYY-MM` — e.g. the month the system went live. */
  min?: string;
}

/**
 * Build a month picker list, newest first, walking back from `reference`.
 * Ideal for "select a month" filters; the `{ id, name }` shape plugs straight
 * into `findOptionById` and `getLabelById`.
 *
 * @example
 * getMonthOptions({ count: 3, reference: "2026-07-21" })
 * // [{ id: "2026-07", name: "Julho/2026" }, { id: "2026-06", name: "Junho/2026" }, { id: "2026-05", name: "Maio/2026" }]
 *
 * getMonthOptions({ count: 3, reference: "2026-07-21", min: "2026-06" })
 * // [{ id: "2026-07", name: "Julho/2026" }, { id: "2026-06", name: "Junho/2026" }]
 */
export function getMonthOptions(options: GetMonthOptionsOptions = {}): MonthOption[] {
  const { count = 12, reference, min } = options;

  const start = (reference ? dayjs(reference) : dayjs()).startOf('month');

  return Array.from({ length: Math.max(count, 0) }, (_, index) => {
    const month = start.subtract(index, 'month');

    return {
      id: month.format('YYYY-MM'),
      name: `${getMonthName(month.toDate())}/${month.format('YYYY')}`,
    };
  }).filter((option) => !min || option.id >= min);
}
