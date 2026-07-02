import { describe, expect, it } from 'vitest';
import { isValidBarcode } from '../validation/isValidBarcode.js';
import { generateBarcode } from './generateBarcode.js';

describe('generateBarcode', () => {
  it('generates valid EAN-13 barcodes by default', () => {
    for (let i = 0; i < 100; i += 1) {
      const barcode = generateBarcode();
      expect(barcode).toMatch(/^\d{13}$/);
      expect(isValidBarcode(barcode)).toBe(true);
    }
  });

  it('generates valid barcodes for every supported length', () => {
    for (const length of [8, 12, 13, 14] as const) {
      const barcode = generateBarcode({ length });
      expect(barcode).toHaveLength(length);
      expect(isValidBarcode(barcode)).toBe(true);
    }
  });
});
