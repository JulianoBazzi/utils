import { presentNumber } from '../number/internal/presentNumber.js';
import { type RoundingMode, roundTo } from '../number/internal/round.js';
import { resolveOptions } from './internal/resolveOptions.js';

export interface FormatPercentageOptions {
  /** Round to a whole number (`"13%"`). Same as `decimals: 0`. Defaults to `false`. */
  round?: boolean;
  /** Decimal places. Defaults to `2` (`0` with `round`). */
  decimals?: number;
  /**
   * How to round to `decimals`: `'round'` (default, symmetric half away from
   * zero), `'floor'` (a 99.6% progress bar never shows "100%") or `'ceil'`.
   */
  rounding?: RoundingMode;
  /** Returned for missing or non-finite input (`null`, `undefined`, `NaN`, `±Infinity`). Defaults to `"0%"`. */
  fallback?: string;
}

/**
 * Format a number as a pt-BR percentage: decimal comma and thousands
 * separator (`1234.5` → `"1.234,50%"`). The value is already the percentage
 * (`12.5` → `"12,50%"`). Zero is formatted (`"0,00%"`); `fallback` covers only
 * missing or non-finite input.
 *
 * @example
 * formatPercentage(12.5) // "12,50%"
 * formatPercentage(12.5, { round: true }) // "13%"
 * formatPercentage(99.6, { decimals: 0, rounding: "floor" }) // "99%"
 * formatPercentage(null, { fallback: "-" }) // "-"
 */
export function formatPercentage(value?: number | null, options?: FormatPercentageOptions): string;
/** Positional form `(value, round, { fallback })`, kept for compatibility (legacy, removed in 2.0). */
export function formatPercentage(
  value?: number | null,
  round?: boolean,
  options?: Pick<FormatPercentageOptions, 'fallback'>,
): string;
export function formatPercentage(
  value?: number | null,
  roundOrOptions?: boolean | FormatPercentageOptions,
  options: Pick<FormatPercentageOptions, 'fallback'> = {},
): string {
  const {
    round = false,
    decimals,
    rounding = 'round',
    fallback = '0%',
  } = resolveOptions<FormatPercentageOptions, 'round'>(roundOrOptions, 'round', options);

  const number = presentNumber(value);
  if (number === undefined) {
    return fallback;
  }

  const digits = decimals ?? (round ? 0 : 2);
  const formatted = roundTo(number, digits, rounding).toLocaleString('pt-BR', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
  return `${formatted}%`;
}
