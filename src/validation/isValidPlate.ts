import { onlyAlphanumeric } from '../formatting/onlyAlphanumeric.js';

const LEGACY_PLATE = /^[A-Z]{3}\d{4}$/;
const MERCOSUL_PLATE = /^[A-Z]{3}\d[A-Z]\d{2}$/;

/**
 * Validate a Brazilian license plate (with or without separator), accepting
 * both the legacy format (`AAA9999`) and the Mercosul format (`AAA9A99`).
 *
 * @example
 * isValidPlate("ABC-1234") // true (legacy)
 * isValidPlate("abc1d23") // true (Mercosul)
 * isValidPlate("AB12345") // false
 */
export function isValidPlate(value?: string | null): boolean {
  const plate = onlyAlphanumeric(value);
  return LEGACY_PLATE.test(plate) || MERCOSUL_PLATE.test(plate);
}
