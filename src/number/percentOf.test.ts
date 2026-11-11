import { describe, expect, it } from 'vitest';
import { percentOf } from './percentOf.js';

describe('percentOf', () => {
  it('computes part / total * 100', () => {
    expect(percentOf(25, 200)).toBe(12.5);
    expect(percentOf(0, 10)).toBe(0);
  });

  it('returns the fallback when it cannot be computed', () => {
    expect(percentOf(5, 0)).toBe(0);
    expect(percentOf(5, -1)).toBe(0);
    expect(percentOf(null, 10)).toBe(0);
    expect(percentOf(0, 0, { fallback: 100 })).toBe(100);
  });
});
