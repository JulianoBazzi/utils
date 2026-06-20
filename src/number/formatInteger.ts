interface FormatIntegerOptions {
  /** Returned for zero/missing input. Defaults to `0`. */
  fallback?: number;
}

/**
 * Round a number to the nearest integer. Returns 0 for zero/missing input.
 *
 * @example
 * formatInteger(1.6) // 2
 * formatInteger(1.4) // 1
 * formatInteger(null, { fallback: -1 }) // -1
 */
export function formatInteger(value?: number | null, options: FormatIntegerOptions = {}): number {
  const { fallback = 0 } = options;
  if (!value) {
    return fallback;
  }

  return Math.round(value);
}
