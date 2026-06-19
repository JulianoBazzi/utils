import { describe, expect, it } from 'vitest';
import { precisionRound } from './precisionRound.js';

describe('precisionRound', () => {
  it('rounds to 2 decimals by default', () => {
    expect(precisionRound(1.2345)).toBe(1.23);
  });

  it('respects a custom precision', () => {
    expect(precisionRound(1.2345, 1)).toBe(1.2);
    expect(precisionRound(1.5, 0)).toBe(2);
  });

  it('returns 0 for zero/missing input', () => {
    expect(precisionRound()).toBe(0);
    expect(precisionRound(0)).toBe(0);
  });
});
