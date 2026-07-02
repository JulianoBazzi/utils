import { describe, expect, it } from 'vitest';
import { isValidRenavam } from '../validation/isValidRenavam.js';
import { generateRenavam } from './generateRenavam.js';

describe('generateRenavam', () => {
  it('generates valid 11-digit RENAVAM codes by default', () => {
    for (let i = 0; i < 100; i += 1) {
      const renavam = generateRenavam();
      expect(renavam).toMatch(/^\d{11}$/);
      expect(isValidRenavam(renavam)).toBe(true);
    }
  });

  it('generates valid legacy 9-digit RENAVAM codes', () => {
    for (let i = 0; i < 100; i += 1) {
      const renavam = generateRenavam({ legacy: true });
      expect(renavam).toMatch(/^\d{9}$/);
      expect(isValidRenavam(renavam)).toBe(true);
    }
  });
});
