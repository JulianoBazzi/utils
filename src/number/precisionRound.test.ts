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

  it('avoids floating-point rounding surprises', () => {
    expect(precisionRound(1.005)).toBe(1.01);
    expect(precisionRound(8.345)).toBe(8.35);
    expect(precisionRound(1.255, 2)).toBe(1.26);
    expect(precisionRound(-1.005)).toBe(-1.01);
  });

  it('handles values already in exponential notation', () => {
    expect(precisionRound(1e-7, 8)).toBe(1e-7);
    expect(precisionRound(1.5e21, 0)).toBe(1.5e21);
  });

  it('returns 0 for non-finite input', () => {
    expect(precisionRound(Number.POSITIVE_INFINITY)).toBe(0);
    expect(precisionRound(Number.NaN)).toBe(0);
  });

  it('returns 0 for zero/missing input', () => {
    expect(precisionRound()).toBe(0);
    expect(precisionRound(0)).toBe(0);
  });
});

describe('precisionRound — 1.3 additions', () => {
  it('rounds halves away from zero for negatives too', () => {
    expect(precisionRound(-2.5, 0)).toBe(-3);
    expect(Object.is(precisionRound(-0.001), 0)).toBe(true);
  });
});
