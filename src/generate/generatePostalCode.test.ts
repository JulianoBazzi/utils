import { describe, expect, it } from 'vitest';
import { isValidPostalCode } from '../validation/isValidPostalCode.js';
import { generatePostalCode } from './generatePostalCode.js';

describe('generatePostalCode', () => {
  it('generates valid postal codes', () => {
    for (let i = 0; i < 100; i += 1) {
      const postalCode = generatePostalCode();
      expect(postalCode).toMatch(/^\d{8}$/);
      expect(isValidPostalCode(postalCode)).toBe(true);
    }
  });

  it('generates a formatted postal code', () => {
    const postalCode = generatePostalCode({ formatted: true });
    expect(postalCode).toMatch(/^\d{5}-\d{3}$/);
    expect(isValidPostalCode(postalCode)).toBe(true);
  });
});
