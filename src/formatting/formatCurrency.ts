import { presentNumber } from '../number/internal/presentNumber.js';
import { roundTo } from '../number/internal/round.js';
import { resolveOptions } from './internal/resolveOptions.js';

export interface FormatCurrencyOptions {
  /** The value is divided by this first, so cents (`1990`) render as `R$ 19,90`. Defaults to `100`. */
  divisor?: number;
  /** Returned for missing or non-finite input. Defaults to `formatCurrency(0)` (`"R$ 0,00"`). */
  fallback?: string;
}

const formatBRL = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

/**
 * Format a number as Brazilian currency (BRL). The value is divided by
 * `divisor` first, so cents stored as integers (e.g. `1990`) render as `R$ 19,90`.
 * Zero is formatted like any other value; `fallback` covers only missing or
 * non-finite input (and a zero `divisor`). Output uses the non-breaking space
 * `Intl` puts after `R$`, fallback included.
 *
 * @example
 * formatCurrency(1990) // "R$ 19,90"
 * formatCurrency(19.9, { divisor: 1 }) // "R$ 19,90"
 * formatCurrency(0, { fallback: "-" }) // "R$ 0,00"
 * formatCurrency(null, { fallback: "-" }) // "-"
 */
export function formatCurrency(value?: number | null, options?: FormatCurrencyOptions): string;
/** Positional form `(value, divisor, { fallback })`, kept for compatibility (legacy, removed in 2.0). */
export function formatCurrency(
  value?: number | null,
  divisor?: number,
  options?: Pick<FormatCurrencyOptions, 'fallback'>,
): string;
export function formatCurrency(
  value?: number | null,
  divisorOrOptions?: number | FormatCurrencyOptions,
  options: Pick<FormatCurrencyOptions, 'fallback'> = {},
): string {
  const { divisor = 100, fallback = formatBRL(0) } = resolveOptions<
    FormatCurrencyOptions,
    'divisor'
  >(divisorOrOptions, 'divisor', options);

  const number = presentNumber(value);
  if (number === undefined || !divisor || !Number.isFinite(divisor)) {
    return fallback;
  }

  return formatBRL(roundTo(number / divisor, 2));
}
