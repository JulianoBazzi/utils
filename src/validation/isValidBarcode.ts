import { eanCheckDigit } from './internal/eanCheckDigit.js';

export interface IsValidBarcodeOptions {
  /**
   * Accepted lengths, e.g. `[8, 13]` for EAN-8/EAN-13 only. Defaults to all
   * supported ones: 8, 12, 13 and 14 digits.
   */
  lengths?: readonly number[];
}

/**
 * Validate an EAN-8 / EAN-13 / GTIN-12/14 barcode via its mod-10 check digit.
 * Accepts 8, 12, 13 or 14 digit strings.
 *
 * @example
 * isValidBarcode("4006381333931") // true
 * isValidBarcode("4006381333930") // false
 */
export function isValidBarcode(
  value?: string | null,
  options: IsValidBarcodeOptions = {},
): boolean {
  const { lengths } = options;
  if (!value || !/^(\d{8}|\d{12,14})$/.test(value)) {
    return false;
  }
  if (lengths && !lengths.includes(value.length)) {
    return false;
  }

  return eanCheckDigit(value.slice(0, -1)) === Number(value.slice(-1));
}
