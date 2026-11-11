import { presentNumber } from './internal/presentNumber.js';

export interface RoundIntegerOptions {
  /** Returned for missing or non-finite input (`null`, `undefined`, `NaN`, `±Infinity`). Defaults to `0`. */
  fallback?: number;
}

/**
 * Round a number to the nearest integer (`Math.round`). Zero is a value, not a
 * missing input: `roundInteger(0, { fallback: -1 })` is `0`.
 *
 * @example
 * roundInteger(1.6) // 2
 * roundInteger(null, { fallback: -1 }) // -1
 */
export function roundInteger(value?: number | null, options: RoundIntegerOptions = {}): number {
  const { fallback = 0 } = options;
  const number = presentNumber(value);
  if (number === undefined) {
    return fallback;
  }
  const rounded = Math.round(number);
  return rounded === 0 ? 0 : rounded;
}
