import { describe, expect, expectTypeOf, it } from 'vitest';
import { isValidDateString } from './isValidDateString.js';

describe('isValidDateString', () => {
  it('accepts real YYYY-MM-DD dates', () => {
    expect(isValidDateString('2024-02-29')).toBe(true);
    expect(isValidDateString('2026-12-31')).toBe(true);
  });

  it('rejects impossible dates and other shapes', () => {
    expect(isValidDateString('2023-02-29')).toBe(false);
    expect(isValidDateString('2024-13-01')).toBe(false);
    expect(isValidDateString('2024-1-5')).toBe(false);
    expect(isValidDateString('2024-01-02T00:00')).toBe(false);
    expect(isValidDateString(20240102)).toBe(false);
    expect(isValidDateString(null)).toBe(false);
  });

  it('narrows without emptying the else branch', () => {
    const value = '2024-01-02' as string | null;
    if (isValidDateString(value)) {
      expectTypeOf(value).toEqualTypeOf<`${number}-${number}-${number}`>();
    } else {
      expectTypeOf(value).toEqualTypeOf<string | null>();
    }
  });
});
