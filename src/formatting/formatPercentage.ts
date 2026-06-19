/**
 * Format a number as a percentage. Uses a comma as the decimal separator and
 * 2 decimals by default; `round` returns a whole number instead.
 * Returns `"0%"` for zero/missing input.
 *
 * @example
 * formatPercentage(12.5) // "12,50%"
 * formatPercentage(12.5, true) // "13%"
 */
export function formatPercentage(value?: number, round = false): string {
  if (!value) {
    return '0%';
  }

  if (round) {
    return `${Math.round(value)}%`;
  }

  return `${value.toFixed(2).replace('.', ',')}%`;
}
