import { describe, expect, it } from 'vitest';
import { formatNumber } from './formatNumber.js';

describe('formatNumber', () => {
  it('uses pt-BR separators by default', () => {
    expect(formatNumber(1234.5)).toBe('1.234,5');
    expect(formatNumber(1234567)).toBe('1.234.567');
    expect(formatNumber(0)).toBe('0');
  });

  it('controls decimals', () => {
    expect(formatNumber(1234.5, { decimals: 2, minDecimals: 2 })).toBe('1.234,50');
    expect(formatNumber(0.1234, { decimals: 2 })).toBe('0,12');
    expect(formatNumber(1.5, { decimals: 0, minDecimals: 1 })).toBe('1,5');
  });

  it('accepts a locale and returns the fallback for missing input', () => {
    expect(formatNumber(1234.5, { locale: 'en' })).toBe('1,234.5');
    expect(formatNumber(null, { fallback: '-' })).toBe('-');
    expect(formatNumber(Number.NaN)).toBe('');
  });
});
