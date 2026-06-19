import { describe, expect, it } from 'vitest';
import { toPositive } from './toPositive.js';

describe('toPositive', () => {
  it('returns positive numbers unchanged', () => {
    expect(toPositive(5)).toBe(5);
  });

  it('clamps negatives to 0', () => {
    expect(toPositive(-5)).toBe(0);
  });

  it('returns 0 for zero/missing input', () => {
    expect(toPositive(0)).toBe(0);
    expect(toPositive()).toBe(0);
  });
});
