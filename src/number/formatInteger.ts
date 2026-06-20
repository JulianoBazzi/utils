/**
 * Round a number to the nearest integer. Returns 0 for zero/missing input.
 *
 * @example
 * formatInteger(1.6) // 2
 * formatInteger(1.4) // 1
 */
export function formatInteger(value?: number | null): number {
  if (!value) {
    return 0;
  }

  return Math.round(value);
}
