import { describe, expect, it } from 'vitest';
import { toCents } from './toCents.js';

describe('toCents', () => {
  it('converts an amount to integer cents', () => {
    expect(toCents(19.9)).toBe(1990);
    expect(toCents(1)).toBe(100);
  });

  it('rounds to the nearest cent', () => {
    expect(toCents(19.999)).toBe(2000);
  });

  it('returns 0 for zero/missing input', () => {
    expect(toCents(0)).toBe(0);
    expect(toCents()).toBe(0);
    expect(toCents(null)).toBe(0);
  });
});
