import { describe, expect, it } from 'vitest';
import { isWednesday } from './isWednesday.js';

describe('isWednesday', () => {
  it('accepts a Wednesday as string or Date', () => {
    expect(isWednesday('2026-07-08')).toBe(true);
    expect(isWednesday(new Date(2026, 6, 8))).toBe(true);
  });

  it('rejects other days of the week', () => {
    expect(isWednesday('2026-07-07')).toBe(false);
    expect(isWednesday('2026-07-09')).toBe(false);
  });

  it('rejects garbage and missing input', () => {
    expect(isWednesday('not-a-date')).toBe(false);
    expect(isWednesday('')).toBe(false);
    expect(isWednesday(null)).toBe(false);
    expect(isWednesday()).toBe(false);
  });
});
