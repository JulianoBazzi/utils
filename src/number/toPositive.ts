/**
 * Clamp a number to be non-negative. Negative/zero/missing → 0.
 *
 * @example
 * toPositive(5) // 5
 * toPositive(-5) // 0
 */
export function toPositive(value?: number | null): number {
  if (value) {
    return value > 0 ? value : 0;
  }

  return 0;
}
