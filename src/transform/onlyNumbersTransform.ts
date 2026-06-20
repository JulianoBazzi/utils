import { onlyNumbers } from '../formatting/onlyNumbers.js';

/**
 * yup-compatible transform: keeps only the digits of the original value.
 * Dependency-free — matches yup's `TransformFunction` signature structurally.
 *
 * @example
 * yup.string().transform(onlyNumbersTransform)
 */
export function onlyNumbersTransform(_value: unknown, originalValue: unknown): string {
  return onlyNumbers(originalValue as string | undefined);
}
