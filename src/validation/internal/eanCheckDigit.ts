import { digitAt } from './digits.js';

/**
 * Mod-10 check digit for EAN/GTIN barcodes. The base (barcode without its
 * last digit) is padded to 13 positions and weighted 3/1 alternating from
 * the left of the 14-position code.
 *
 * @internal
 */
export function eanCheckDigit(base: string): number {
  const padded = base.padStart(13, '0');

  let sum = 0;
  for (let i = 0; i < 13; i += 1) {
    sum += digitAt(padded, i) * (i % 2 === 0 ? 3 : 1);
  }

  return (10 - (sum % 10)) % 10;
}
