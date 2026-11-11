import { presentNumber } from '../number/internal/presentNumber.js';

export interface FormatCompactNumberOptions {
  /** Maximum fraction digits. Defaults to `1`. */
  decimals?: number;
  /**
   * Locale of the compact notation (`"pt-BR"` → `"1,5 mil"`). Defaults to
   * `"en"` (`"1.5K"`); the default becomes `"pt-BR"` in 2.0.
   */
  locale?: string;
  /** Returned for missing or non-finite input (`null`, `undefined`, `NaN`, `±Infinity`). Defaults to `""`. */
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
 * formatCompactNumber(1500, { locale: "pt-BR" }) // "1,5 mil"
 * formatCompactNumber(null, { fallback: "—" }) // "—"
 */
export function formatCompactNumber(
  value?: number | null,
  options: FormatCompactNumberOptions = {},
): string {
  const { decimals = 1, locale = 'en', fallback = '' } = options;
  const number = presentNumber(value);
  if (number === undefined) {
    return fallback;
  }

  return number.toLocaleString(locale, {
    notation: 'compact',
    maximumFractionDigits: decimals,
  });
}
