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

describe('isDateTimeString — 1.3 additions', () => {
  it('accepts fractional seconds and offsets', () => {
    expect(isDateTimeString('2026-06-25T11:04:23.000Z')).toBe(true);
    expect(isDateTimeString('2026-06-25T11:04:23-03:00')).toBe(true);
    expect(isDateTimeString('2026-06-25T11:04+0300')).toBe(true);
  });

  it('rejects trailing text and impossible dates or times', () => {
    expect(isDateTimeString('2026-06-25 11:04abc')).toBe(false);
    expect(isDateTimeString('2026-02-30T10:00')).toBe(false);
    expect(isDateTimeString('2026-06-25 24:00')).toBe(false);
    expect(isDateTimeString(42)).toBe(false);
  });
});
