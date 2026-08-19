import { describe, expect, it } from 'vitest';
import { isMonday } from './isMonday.js';

describe('isMonday', () => {
  it('accepts a Monday as string or Date', () => {
    expect(isMonday('2026-07-06')).toBe(true);
    expect(isMonday(new Date(2026, 6, 6))).toBe(true);
  });

  it('rejects other days of the week', () => {
    expect(isMonday('2026-07-05')).toBe(false);
    expect(isMonday('2026-07-07')).toBe(false);
  });

  it('rejects garbage and missing input', () => {
    expect(isMonday('not-a-date')).toBe(false);
    expect(isMonday('')).toBe(false);
    expect(isMonday(null)).toBe(false);
    expect(isMonday()).toBe(false);
  });
});
