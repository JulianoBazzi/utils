import { describe, expect, it } from 'vitest';
import { safeDivide } from './safeDivide.js';

describe('safeDivide', () => {
  it('divides normally', () => {
    expect(safeDivide(10, 2)).toBe(5);
  });

  it('returns 0 for a zero divisor', () => {
    expect(safeDivide(10, 0)).toBe(0);
  });

  it('returns 0 for a negative or missing divisor', () => {
    expect(safeDivide(10, -2)).toBe(0);
    expect(safeDivide(10, -2, { allowNegativeDivisor: true })).toBe(-5);
    expect(safeDivide(10)).toBe(0);
  });
});

describe('safeDivide — 1.3 additions', () => {
  it('returns the fallback for a missing or non-finite numerator', () => {
    expect(safeDivide(null, 2)).toBe(0);
    expect(safeDivide(undefined, 2)).toBe(0);
    expect(safeDivide(Number.NaN, 2)).toBe(0);
    expect(safeDivide(Number.POSITIVE_INFINITY, 2, { fallback: -1 })).toBe(-1);
  });

  it('uses the fallback for impossible divisions', () => {
    expect(safeDivide(10, 0, { fallback: 100 })).toBe(100);
  });
});
