interface FormatCompactNumberOptions {
  /** Maximum fraction digits. Defaults to `1`. */
  decimals?: number;
  /** Returned when the input is missing (`null`/`undefined`). Defaults to `""`. */
  fallback?: string;
}

/**
 * Format a number in compact notation (e.g. `1.5M`, `100K`) via `Intl`.
 * Uses the `en` locale, so the suffix is `K`/`M`/`B` with a dot decimal.
 * `0` is a valid value (renders `"0"`); only `null`/`undefined` use the fallback.
 *
 * @example
 * formatCompactNumber(1500000) // "1.5M"
 * formatCompactNumber(100000) // "100K"
 * formatCompactNumber(1234, { decimals: 2 }) // "1.23K"
 * formatCompactNumber(null, { fallback: "—" }) // "—"
 */
export function formatCompactNumber(
  value?: number | null,
  options: FormatCompactNumberOptions = {},
): string {
  const { decimals = 1, fallback = '' } = options;
  if (value == null) {
    return fallback;
  }

  return value.toLocaleString('en', {
    notation: 'compact',
    maximumFractionDigits: decimals,
  });
}
