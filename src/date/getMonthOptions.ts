import { getMonthName } from '../formatting/getMonthName.js';
import { parseDate } from './internal/parseDate.js';
import { nowIn } from './internal/timeZone.js';
import type { DateInput, TimeZoneOptions } from './types.js';

/** A `{ id, name }` pair, the shape accepted by `findOptionById` / `getLabelById`. */
export interface MonthOption {
  /** Month identifier, `YYYY-MM`. */
  id: string;
  /** Human label, e.g. `"Julho/2026"`. */
  name: string;
}

export interface GetMonthOptionsOptions extends TimeZoneOptions {
  /** How many months to generate. Defaults to `12`. */
  count?: number;
  /** Most recent month in the list. Defaults to today (in `timeZone` when given). */
  reference?: DateInput;
  /** Drop months earlier than this `YYYY-MM` — e.g. the month the system went live. */
  min?: string;
}

/**
 * Build a month picker list, newest first, walking back from `reference`.
 * Ideal for "select a month" filters; the `{ id, name }` shape plugs straight
 * into `findOptionById` and `getLabelById`. An unparseable `reference` yields `[]`.
 *
 * @example
 * getMonthOptions({ count: 3, reference: "2026-07-21" })
 * // [{ id: "2026-07", name: "Julho/2026" }, { id: "2026-06", name: "Junho/2026" }, { id: "2026-05", name: "Maio/2026" }]
 *
 * getMonthOptions({ count: 3, reference: "2026-07-21", min: "2026-06" })
 * // [{ id: "2026-07", name: "Julho/2026" }, { id: "2026-06", name: "Junho/2026" }]
 */
export function getMonthOptions(options: GetMonthOptionsOptions = {}): MonthOption[] {
  const { count = 12, reference, min, timeZone } = options;

  const base = reference ? parseDate(reference, { timeZone }) : nowIn(timeZone);
  if (!base) {
    return [];
  }
  const start = base.startOf('month');

  return Array.from({ length: Math.max(count, 0) }, (_, index) => {
    const id = start.subtract(index, 'month').format('YYYY-MM');
    // Pass the naive `YYYY-MM` string so the zone is never applied twice.
    return { id, name: `${getMonthName(id)}/${id.slice(0, 4)}` };
  }).filter((option) => !min || option.id >= min);
}
