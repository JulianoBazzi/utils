interface FormatPercentageOptions {
  /** Returned for zero/missing input. Defaults to `"0%"`. */
  fallback?: string;
}

/**
 * Format a number as a percentage. Uses a comma as the decimal separator and
 * 2 decimals by default; `round` returns a whole number instead.
 * Returns `"0%"` for zero/missing input.
 *
 * @example
 * formatPercentage(12.5) // "12,50%"
 * formatPercentage(12.5, true) // "13%"
 * formatPercentage(null, false, { fallback: "—" }) // "—"
 */
export function formatPercentage(
  value?: number | null,
  round = false,
  options: FormatPercentageOptions = {},
): string {
  const { fallback = '0%' } = options;
  if (!value) {
    return fallback;
  }

  if (round) {
    return `${Math.round(value)}%`;
  }

  return `${value.toFixed(2).replace('.', ',')}%`;
}
