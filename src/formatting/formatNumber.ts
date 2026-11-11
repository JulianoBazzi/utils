import { presentNumber } from '../number/internal/presentNumber.js';

export interface FormatNumberOptions {
  /** Maximum decimal places. Defaults to `3` (the `Intl` default). */
  decimals?: number;
  /** Minimum decimal places (pads with zeros). Defaults to `0`. */
  minDecimals?: number;
  /** Locale. Defaults to `"pt-BR"` (`1.234,5`). */
  locale?: string;
  /** Returned for missing or non-finite input. Defaults to `""`. */
  fallback?: string;
}

/**
 * Format a number with locale separators — pt-BR by default (`1234.5` →
 * `"1.234,5"`). Zero is formatted; `fallback` covers only missing or
 * non-finite input.
 *
 * @example
 * formatNumber(1234.5) // "1.234,5"
 * formatNumber(1234.5, { decimals: 2, minDecimals: 2 }) // "1.234,50"
 * formatNumber(0.1234, { decimals: 2 }) // "0,12"
 * formatNumber(null, { fallback: "-" }) // "-"
 */
export function formatNumber(value?: number | null, options: FormatNumberOptions = {}): string {
  const { decimals, minDecimals = 0, locale = 'pt-BR', fallback = '' } = options;
  const number = presentNumber(value);
  if (number === undefined) {
    return fallback;
  }

  return number.toLocaleString(locale, {
    minimumFractionDigits: minDecimals,
    maximumFractionDigits: Math.max(decimals ?? 3, minDecimals),
  });
}
