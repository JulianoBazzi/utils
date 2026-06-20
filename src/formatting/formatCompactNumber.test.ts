import { describe, expect, it } from 'vitest';
import { formatCompactNumber } from './formatCompactNumber.js';

describe('formatCompactNumber', () => {
  it('formats millions and thousands', () => {
    expect(formatCompactNumber(1500000)).toBe('1.5M');
    expect(formatCompactNumber(100000)).toBe('100K');
    expect(formatCompactNumber(2300000000)).toBe('2.3B');
  });

  it('respects the decimals option', () => {
    expect(formatCompactNumber(1234, { decimals: 2 })).toBe('1.23K');
    expect(formatCompactNumber(1550000, { decimals: 0 })).toBe('2M');
  });

  it('renders zero as "0"', () => {
    expect(formatCompactNumber(0)).toBe('0');
  });

  it('returns the fallback only for missing input', () => {
    expect(formatCompactNumber()).toBe('');
    expect(formatCompactNumber(null)).toBe('');
    expect(formatCompactNumber(undefined, { fallback: '—' })).toBe('—');
  });
});
