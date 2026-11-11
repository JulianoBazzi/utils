import { describe, expect, it } from 'vitest';
import { formatPercentage } from './formatPercentage.js';

describe('formatPercentage', () => {
  it('formats with 2 decimals and comma separator', () => {
    expect(formatPercentage(12.5)).toBe('12,50%');
  });

  it('rounds when round is true', () => {
    expect(formatPercentage(12.5, true)).toBe('13%');
  });

  it('formats zero and returns 0% for missing input', () => {
    expect(formatPercentage(0)).toBe('0,00%');
    expect(formatPercentage(0, true)).toBe('0%');
    expect(formatPercentage()).toBe('0%');
  });

  it('uses a custom fallback for missing input only', () => {
    expect(formatPercentage(null, false, { fallback: '—' })).toBe('—');
    expect(formatPercentage(0, true, { fallback: '—' })).toBe('0%');
  });
});

describe('formatPercentage — 1.3 additions', () => {
  it('accepts an options object', () => {
    expect(formatPercentage(12.5, { round: true })).toBe('13%');
    expect(formatPercentage(12.345, { decimals: 1 })).toBe('12,3%');
    expect(formatPercentage(99.6, { decimals: 0, rounding: 'floor' })).toBe('99%');
    expect(formatPercentage(12.01, { decimals: 0, rounding: 'ceil' })).toBe('13%');
  });

  it('uses thousands separators and exact, symmetric rounding', () => {
    expect(formatPercentage(1234.5)).toBe('1.234,50%');
    expect(formatPercentage(1.005)).toBe('1,01%');
    expect(formatPercentage(-12.5, true)).toBe('-13%');
  });

  it('returns the fallback for non-finite input', () => {
    expect(formatPercentage(Number.POSITIVE_INFINITY)).toBe('0%');
    expect(formatPercentage(Number.NaN, { fallback: '-' })).toBe('-');
  });
});
