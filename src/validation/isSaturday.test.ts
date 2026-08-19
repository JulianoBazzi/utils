import { describe, expect, it } from 'vitest';
import { isSaturday } from './isSaturday.js';

describe('isSaturday', () => {
  it('accepts a Saturday as string or Date', () => {
    expect(isSaturday('2026-07-11')).toBe(true);
    expect(isSaturday(new Date(2026, 6, 11))).toBe(true);
  });

  it('rejects other days of the week', () => {
    expect(isSaturday('2026-07-10')).toBe(false);
    expect(isSaturday('2026-07-12')).toBe(false);
  });

  it('rejects garbage and missing input', () => {
    expect(isSaturday('not-a-date')).toBe(false);
    expect(isSaturday('')).toBe(false);
    expect(isSaturday(null)).toBe(false);
    expect(isSaturday()).toBe(false);
  });
});
