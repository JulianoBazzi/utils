import { onlyAlphanumeric } from '../formatting/onlyAlphanumeric.js';

/**
 * yup-compatible transform: keeps only the alphanumeric characters (uppercased)
 * of the original value. Useful for alphanumeric documents (e.g. CNPJ).
 * Dependency-free — matches yup's `TransformFunction` signature structurally.
 *
 * @example
 * yup.string().transform(onlyAlphanumericTransform)
 */
export function onlyAlphanumericTransform(_value: unknown, originalValue: unknown): string {
  return onlyAlphanumeric(originalValue as string | undefined);
}
