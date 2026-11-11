import { onlyNumbers } from '../formatting/onlyNumbers.js';

export interface CurrencyTransformOptions {
  /** The digits are divided by this (cents → reais). Defaults to `100`. */
  divisor?: number;
}

/**
 * yup-compatible transform for masked currency inputs that store cents: keeps
 * the digits of the original value and divides them by `divisor` (100), so
 * `"R$ 19,90"` becomes `19.9` and a number `1990` becomes `19.9`. Empty input
 * becomes `null` — `.nullable()` fields can send `null` and `.required()`
 * fields show the "required" message. A leading minus is kept.
 *
 * Dependency-free — matches yup's `TransformFunction` signature structurally.
 * For another divisor wrap it: `(v, o) => currencyTransform(v, o, { divisor: 1 })`.
 *
 * @example
 * yup.number().nullable().transform(currencyTransform)
 * currencyTransform(undefined, "R$ 1.234,56") // 1234.56
 * currencyTransform(undefined, "") // null
 */
export function currencyTransform(
  _value: unknown,
  originalValue: unknown,
  options?: CurrencyTransformOptions,
): number | null {
  // yup passes the schema as the 3rd argument; only honour a numeric divisor.
  const divisor = typeof options?.divisor === 'number' && options.divisor ? options.divisor : 100;

  if (typeof originalValue === 'number') {
    return Number.isFinite(originalValue) ? originalValue / divisor : null;
  }

  const text = typeof originalValue === 'string' ? originalValue : '';
  const digits = onlyNumbers(text);
  if (!digits) {
    return null;
  }

  const sign = text.trim().startsWith('-') ? -1 : 1;
  return (sign * Number(digits)) / divisor;
}
