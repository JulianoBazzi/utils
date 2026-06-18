/**
 * Validate an EAN-8 / EAN-13 / GTIN-12/14 barcode via its mod-10 check digit.
 * Accepts 8, 12, 13 or 14 digit strings.
 *
 * @example
 * isValidBarcode("4006381333931") // true
 * isValidBarcode("4006381333930") // false
 */
export function isValidBarcode(value: string): boolean {
  if (!/^(\d{8}|\d{12,14})$/.test(value)) {
    return false;
  }

  const paddedValue = value.padStart(14, "0");

  let result = 0;
  for (let i = 0; i < paddedValue.length - 1; i += 1) {
    result += Number.parseInt(paddedValue.charAt(i), 10) * (i % 2 === 0 ? 3 : 1);
  }

  return (10 - (result % 10)) % 10 === Number.parseInt(paddedValue.charAt(13), 10);
}
