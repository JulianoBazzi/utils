import { maskSecret } from '../formatting/maskSecret.js';

interface MaskFieldsOptions {
  /** Replaces the value of every matched field. Defaults to `maskSecret`. */
  mask?: (value: string) => string;
}

/**
 * Deep-clone a value, replacing the string values of the given field names at
 * any depth — the shape an audit log needs before storing a payload. Values of
 * other types under a matched key are left alone, so a `null` password stays
 * `null` instead of turning into a mask.
 *
 * Cloning goes through JSON, with the usual consequences: `Date` becomes an ISO
 * string, `undefined` and functions are dropped, and `BigInt` or a circular
 * reference throws. `null`/`undefined` are returned unchanged.
 *
 * @example
 * maskFields({ user: { password: "s3cr3t-value-here" } }, ["password"])
 * // { user: { password: "s3cr3••••••-here" } }
 * maskFields({ token: "abc" }, ["token"], { mask: () => "[redacted]" })
 * // { token: "[redacted]" }
 */
export function maskFields<T>(
  value: T,
  fields: Iterable<string>,
  options: MaskFieldsOptions = {},
): T {
  if (value == null) {
    return value;
  }

  const { mask = maskSecret } = options;
  const masked = new Set(fields);

  return JSON.parse(
    JSON.stringify(value, (key, entry) =>
      masked.has(key) && typeof entry === 'string' ? mask(entry) : entry,
    ),
  ) as T;
}
