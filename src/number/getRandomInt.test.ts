import { describe, expect, it } from 'vitest';
import { getRandomInt } from './getRandomInt.js';

describe('getRandomInt', () => {
  it('stays within the default range 1..100', () => {
    for (let i = 0; i < 1000; i += 1) {
      const n = getRandomInt();
      expect(n).toBeGreaterThanOrEqual(1);
      expect(n).toBeLessThanOrEqual(100);
      expect(Number.isInteger(n)).toBe(true);
    }
  });

  it('stays within a custom range', () => {
    for (let i = 0; i < 1000; i += 1) {
      const n = getRandomInt(1, 6);
      expect(n).toBeGreaterThanOrEqual(1);
      expect(n).toBeLessThanOrEqual(6);
    }
  });

  it('returns the bound when min equals max', () => {
    expect(getRandomInt(7, 7)).toBe(7);
  });
});
