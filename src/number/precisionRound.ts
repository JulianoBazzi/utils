// Shift the decimal point by `exponent` places using exponential notation, so the
// intermediate value is exact (unlike `value * 10 ** precision`, which turns
// 1.005 into 100.49999999999999).
function shift(value: number, exponent: number): number {
  const [mantissa, exp = '0'] = String(value).split('e');
  return Number(`${mantissa}e${Number(exp) + exponent}`);
}

/**
 * Round a number to a fixed number of decimal places, without the usual
 * floating-point surprises (`1.005` → `1.01`, not `1`).
 * Returns `0` for missing/zero input.
 *
 * @example
 * precisionRound(1.2345) // 1.23
 * precisionRound(1.2345, 1) // 1.2
 * precisionRound(1.005) // 1.01
 */
export function precisionRound(value?: number | null, precision = 2): number {
  if (!value || !Number.isFinite(value)) {
    return 0;
  }

  return shift(Math.round(shift(value, precision)), -precision);
}
