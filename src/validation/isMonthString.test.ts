import { describe, expect, it } from 'vitest';
import { isMonthString } from './isMonthString.js';

describe('isMonthString', () => {
  it('accepts YYYY-MM with a real month', () => {
    expect(isMonthString('2026-07')).toBe(true);
    expect(isMonthString('2026-12')).toBe(true);
  });

  it('rejects other shapes', () => {
    expect(isMonthString('2026-13')).toBe(false);
    expect(isMonthString('2026-00')).toBe(false);
    expect(isMonthString('2026-7')).toBe(false);
    expect(isMonthString(202607)).toBe(false);
    expect(isMonthString(null)).toBe(false);
  });

  it('respects min and max', () => {
    expect(isMonthString('2026-08', { max: '2026-07' })).toBe(false);
    expect(isMonthString('2026-07', { max: '2026-07' })).toBe(true);
    expect(isMonthString('2025-12', { min: '2026-01' })).toBe(false);
    expect(isMonthString('2026-01', { min: '2026-01' })).toBe(true);
  });
});
