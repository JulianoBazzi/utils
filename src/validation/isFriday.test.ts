import { describe, expect, it } from 'vitest';
import { isFriday } from './isFriday.js';

describe('isFriday', () => {
  it('accepts a Friday as string or Date', () => {
    expect(isFriday('2026-07-10')).toBe(true);
    expect(isFriday(new Date(2026, 6, 10))).toBe(true);
  });

  it('rejects other days of the week', () => {
    expect(isFriday('2026-07-09')).toBe(false);
    expect(isFriday('2026-07-11')).toBe(false);
  });

  it('rejects garbage and missing input', () => {
    expect(isFriday('not-a-date')).toBe(false);
    expect(isFriday('')).toBe(false);
    expect(isFriday(null)).toBe(false);
    expect(isFriday()).toBe(false);
  });
});
