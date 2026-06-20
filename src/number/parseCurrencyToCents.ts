import { toCents } from './toCents.js';

/**
 * Parse a Brazilian currency string into integer cents. Handles the `R$` symbol,
 * `.` as thousands separator and `,` as decimal. Invalid/missing input → 0.
 *
 * @example
 * parseCurrencyToCents("R$ 19,90") // 1990
 * parseCurrencyToCents("R$ 1.234,56") // 123456
 */
export function parseCurrencyToCents(value?: string | null): number {
  if (!value) {
    return 0;
  }

  const normalized = value
    .replace(/[^\d,.-]/g, '')
    .replace(/\./g, '')
    .replace(',', '.');
  const amount = Number.parseFloat(normalized);

  return Number.isNaN(amount) ? 0 : toCents(amount);
}
