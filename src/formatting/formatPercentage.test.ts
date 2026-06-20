import { describe, expect, it } from 'vitest';
import { formatPercentage } from './formatPercentage.js';

describe('formatPercentage', () => {
  it('formats with 2 decimals and comma separator', () => {
    expect(formatPercentage(12.5)).toBe('12,50%');
  });

  it('rounds when round is true', () => {
    expect(formatPercentage(12.5, true)).toBe('13%');
  });

  it('returns 0% for zero/missing input', () => {
    expect(formatPercentage(0)).toBe('0%');
    expect(formatPercentage()).toBe('0%');
  });

  it('uses a custom fallback for zero/missing input', () => {
    expect(formatPercentage(null, false, { fallback: '—' })).toBe('—');
    expect(formatPercentage(0, true, { fallback: '—' })).toBe('—');
  });
});
