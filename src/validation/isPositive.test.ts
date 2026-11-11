import { describe, expect, it } from 'vitest';
import { isPositive } from './isPositive.js';

describe('isPositive', () => {
  it('accepts finite numbers above zero', () => {
    expect(isPositive(3)).toBe(true);
    expect(isPositive(0.1)).toBe(true);
  });

  it('rejects zero, negatives, non-finite and missing values', () => {
    expect(isPositive(0)).toBe(false);
    expect(isPositive(-1)).toBe(false);
    expect(isPositive(Number.NaN)).toBe(false);
    expect(isPositive(Number.POSITIVE_INFINITY)).toBe(false);
    expect(isPositive(null)).toBe(false);
  });
});
