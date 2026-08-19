import { describe, expect, it } from 'vitest';
import { isSunday } from './isSunday.js';

describe('isSunday', () => {
  it('accepts a Sunday as string or Date', () => {
    expect(isSunday('2026-07-05')).toBe(true);
    expect(isSunday(new Date(2026, 6, 5))).toBe(true);
  });

  it('rejects other days of the week', () => {
    expect(isSunday('2026-07-06')).toBe(false);
    expect(isSunday('2026-07-11')).toBe(false);
  });

  it('rejects garbage and missing input', () => {
    expect(isSunday('not-a-date')).toBe(false);
    expect(isSunday(new Date('invalid'))).toBe(false);
    expect(isSunday('')).toBe(false);
    expect(isSunday(null)).toBe(false);
    expect(isSunday()).toBe(false);
  });
});
