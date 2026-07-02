import { describe, expect, it } from 'vitest';
import { isValidCNH } from '../validation/isValidCNH.js';
import { generateCNH } from './generateCNH.js';

describe('generateCNH', () => {
  it('generates valid CNH numbers', () => {
    for (let i = 0; i < 100; i += 1) {
      const cnh = generateCNH();
      expect(cnh).toMatch(/^\d{11}$/);
      expect(isValidCNH(cnh)).toBe(true);
    }
  });
});
