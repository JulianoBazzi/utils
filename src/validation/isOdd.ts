/**
 * Check whether a number is odd. Works for negative numbers too.
 *
 * @example
 * isOdd(3) // true
 * isOdd(-3) // true
 * isOdd(4) // false
 */
export function isOdd(value: number): boolean {
  return Number.isInteger(value) && value % 2 !== 0;
}
