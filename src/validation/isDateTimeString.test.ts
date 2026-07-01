import { describe, expect, it } from 'vitest';
import { isDateTimeString } from './isDateTimeString.js';

describe('isDateTimeString', () => {
  it('accepts the ISO T separator', () => {
    expect(isDateTimeString('2026-06-25T11:04:23')).toBe(true);
  });

  it('accepts the SQL-style space separator', () => {
    expect(isDateTimeString('2026-06-25 11:04')).toBe(true);
    expect(isDateTimeString('2026-06-25 11:04:23')).toBe(true);
  });

  it('rejects date-only and missing input', () => {
    expect(isDateTimeString('2026-06-25')).toBe(false);
    expect(isDateTimeString('')).toBe(false);
    expect(isDateTimeString(null)).toBe(false);
    expect(isDateTimeString()).toBe(false);
  });
});
