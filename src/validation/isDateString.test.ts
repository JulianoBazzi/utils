import { describe, expect, it } from 'vitest';
import { isDateString } from './isDateString.js';

describe('isDateString', () => {
  it('accepts an ISO date without time', () => {
    expect(isDateString('2026-06-25')).toBe(true);
  });

  it('rejects date-time strings', () => {
    expect(isDateString('2026-06-25 11:04:23')).toBe(false);
    expect(isDateString('2026-06-25T11:04:23')).toBe(false);
  });

  it('rejects garbage and missing input', () => {
    expect(isDateString('25/06/2026')).toBe(false);
    expect(isDateString('')).toBe(false);
    expect(isDateString(null)).toBe(false);
    expect(isDateString()).toBe(false);
  });
});
