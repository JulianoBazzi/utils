import { onlyNumbers } from "../formatting/onlyNumbers.js";

/**
 * Validate a Brazilian postal code (CEP). CEP has no check digit, so this
 * checks that it has exactly 8 digits (with or without the `-` mask).
 *
 * @example
 * isValidPostalCode("01310-100") // true
 * isValidPostalCode("123") // false
 */
export function isValidPostalCode(value?: string): boolean {
  return onlyNumbers(value).length === 8;
}
