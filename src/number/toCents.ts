/**
 * Convert a currency amount to integer cents — inverse of `formatCurrency`
 * (divisor 100). Returns 0 for zero/missing input.
 *
 * @example
 * toCents(19.9) // 1990
 * toCents(0) // 0
 */
export function toCents(value?: number | null): number {
  if (!value) {
    return 0;
  }

  return Math.round(value * 100);
}
