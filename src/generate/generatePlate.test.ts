import { describe, expect, it } from 'vitest';
import { isValidPlate } from '../validation/isValidPlate.js';
import { generatePlate } from './generatePlate.js';

describe('generatePlate', () => {
  it('generates valid Mercosul plates by default', () => {
    for (let i = 0; i < 100; i += 1) {
      const plate = generatePlate();
      expect(plate).toMatch(/^[A-Z]{3}\d[A-Z]\d{2}$/);
      expect(isValidPlate(plate)).toBe(true);
    }
  });

  it('generates valid legacy plates', () => {
    for (let i = 0; i < 100; i += 1) {
      const plate = generatePlate({ mercosul: false });
      expect(plate).toMatch(/^[A-Z]{3}\d{4}$/);
      expect(isValidPlate(plate)).toBe(true);
    }
  });

  it('generates a formatted legacy plate with the separator', () => {
    const plate = generatePlate({ mercosul: false, formatted: true });
    expect(plate).toMatch(/^[A-Z]{3}-\d{4}$/);
    expect(isValidPlate(plate)).toBe(true);
  });
});
