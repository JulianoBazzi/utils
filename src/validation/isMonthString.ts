const MONTH_PATTERN = /^\d{4}-(0[1-9]|1[0-2])$/;

export interface IsMonthStringOptions {
  /** Earliest accepted month, `YYYY-MM` (inclusive). */
  min?: string;
  /** Latest accepted month, `YYYY-MM` (inclusive) — e.g. `getCurrentMonth()`. */
  max?: string;
}

/**
 * Check whether a value is a `YYYY-MM` month (01–12), optionally inside
 * `[min, max]` — the shape of a "competência" field.
 *
 * @example
 * isMonthString("2026-07") // true
 * isMonthString("2026-13") // false
 * isMonthString("2026-08", { max: "2026-07" }) // false
 */
export function isMonthString(value?: unknown, options: IsMonthStringOptions = {}): boolean {
  const { min, max } = options;
  if (typeof value !== 'string' || !MONTH_PATTERN.test(value)) {
    return false;
  }
  return (!min || value >= min) && (!max || value <= max);
}
