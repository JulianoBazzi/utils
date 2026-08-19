import { describe, expect, it } from 'vitest';
import { isValidUF } from '../validation/isValidUF.js';
import { generateUF } from './generateUF.js';

describe('generateUF', () => {
  it('always returns a valid UF', () => {
    for (let i = 0; i < 200; i += 1) {
      const uf = generateUF();

      expect(isValidUF(uf)).toBe(true);
      expect(uf).toMatch(/^[A-Z]{2}$/);
    }
  });

  it('produces different values across calls', () => {
    const values = new Set(Array.from({ length: 100 }, () => generateUF()));

    expect(values.size).toBeGreaterThan(1);
  });
});
