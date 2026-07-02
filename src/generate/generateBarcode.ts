import { getRandomInt } from '../number/getRandomInt.js';
import { eanCheckDigit } from '../validation/internal/eanCheckDigit.js';

interface GenerateBarcodeOptions {
  /** Barcode length: EAN-8, GTIN-12, EAN-13 (default) or GTIN-14. */
  length?: 8 | 12 | 13 | 14;
}

/**
 * Generate a random EAN/GTIN barcode with a valid mod-10 check digit — handy
 * for tests and seeds.
 *
 * @example
 * generateBarcode() // e.g. "4006381333931" (EAN-13)
 * generateBarcode({ length: 8 }) // e.g. "40063917" (EAN-8)
 */
export function generateBarcode(options: GenerateBarcodeOptions = {}): string {
  const { length = 13 } = options;

  const base = Array.from({ length: length - 1 }, () => getRandomInt(0, 9)).join('');

  return `${base}${eanCheckDigit(base)}`;
}
