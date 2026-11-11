import { eanCheckDigit } from '../validation/internal/eanCheckDigit.js';
import { randomDigits } from './internal/randomDigits.js';

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

  const base = randomDigits(length - 1);

  return `${base}${eanCheckDigit(base)}`;
}
