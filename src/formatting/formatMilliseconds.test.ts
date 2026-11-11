import { describe, expect, it } from 'vitest';
import { formatMilliseconds } from './formatMilliseconds.js';

describe('formatMilliseconds', () => {
  it('formats seconds with a pt-BR decimal comma', () => {
    expect(formatMilliseconds(2345)).toBe('2,3s');
    expect(formatMilliseconds(0)).toBe('0,0s');
    expect(formatMilliseconds(1234.5, { decimals: 3 })).toBe('1,234s');
  });

  it('shows minutes and truncates seconds', () => {
    expect(formatMilliseconds(62345, { showMinutes: true })).toBe('1m 2,3s');
    expect(formatMilliseconds(119999, { showMinutes: true })).toBe('1m 59,9s');
    expect(formatMilliseconds(2345, { showMinutes: true })).toBe('2,3s');
  });

  it('keeps the sign and accepts a locale', () => {
    expect(formatMilliseconds(-2345)).toBe('-2,3s');
    expect(formatMilliseconds(-62345, { showMinutes: true })).toBe('-1m 2,3s');
    expect(formatMilliseconds(-10)).toBe('0,0s');
    expect(formatMilliseconds(2345, { decimals: 3, locale: 'en' })).toBe('2.345s');
  });

  it('returns the fallback for missing input', () => {
    expect(formatMilliseconds(null, { fallback: '-' })).toBe('-');
  });
});
