import { describe, expect, it } from 'vitest';
import { isThursday } from './isThursday.js';

describe('isThursday', () => {
  it('accepts a Thursday as string or Date', () => {
    expect(isThursday('2026-07-09')).toBe(true);
    expect(isThursday(new Date(2026, 6, 9))).toBe(true);
  });

  it('rejects other days of the week', () => {
    expect(isThursday('2026-07-08')).toBe(false);
    expect(isThursday('2026-07-10')).toBe(false);
  });

  it('rejects garbage and missing input', () => {
    expect(isThursday('not-a-date')).toBe(false);
    expect(isThursday('')).toBe(false);
    expect(isThursday(null)).toBe(false);
    expect(isThursday()).toBe(false);
  });
});
