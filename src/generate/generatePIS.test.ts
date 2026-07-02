import { describe, expect, it } from 'vitest';
import { isValidPIS } from '../validation/isValidPIS.js';
import { generatePIS } from './generatePIS.js';

describe('generatePIS', () => {
  it('generates valid PIS numbers', () => {
    for (let i = 0; i < 100; i += 1) {
      const pis = generatePIS();
      expect(pis).toMatch(/^\d{11}$/);
      expect(isValidPIS(pis)).toBe(true);
    }
  });

  it('generates a formatted PIS', () => {
    const pis = generatePIS({ formatted: true });
    expect(pis).toMatch(/^\d{3}\.\d{5}\.\d{2}-\d$/);
    expect(isValidPIS(pis)).toBe(true);
  });
});
