/** How a value is rounded to the target precision. */
export type RoundingMode = 'round' | 'floor' | 'ceil';

/**
 * Shift the decimal point by `exponent` places using exponential notation, so
 * the intermediate value is exact (unlike `value * 10 ** precision`, which
 * turns 1.005 into 100.49999999999999).
 *
 * @internal
 */
export function shift(value: number, exponent: number): number {
  const [mantissa, exp = '0'] = String(value).split('e');
  return Number(`${mantissa}e${Number(exp) + exponent}`);
}

/**
 * Round `value` to `precision` decimal places. `'round'` is symmetric (half
 * away from zero: `-1.005` → `-1.01`); `'floor'`/`'ceil'` go toward -∞/+∞.
 * `-0` comes back as `0`.
 *
 * @internal
 */
export function roundTo(value: number, precision: number, mode: RoundingMode = 'round'): number {
  let result: number;
  if (mode === 'round') {
    result = Math.sign(value) * shift(Math.round(shift(Math.abs(value), precision)), -precision);
  } else {
    const step = mode === 'floor' ? Math.floor : Math.ceil;
    result = shift(step(shift(value, precision)), -precision);
  }
  return result === 0 ? 0 : result;
}
