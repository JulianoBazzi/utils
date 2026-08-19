import { describe, expect, it } from 'vitest';
import { isTuesday } from './isTuesday.js';

describe('isTuesday', () => {
  it('accepts a Tuesday as string or Date', () => {
    expect(isTuesday('2026-07-07')).toBe(true);
    expect(isTuesday(new Date(2026, 6, 7))).toBe(true);
  });

  it('rejects other days of the week', () => {
    expect(isTuesday('2026-07-06')).toBe(false);
    expect(isTuesday('2026-07-08')).toBe(false);
  });

  it('rejects garbage and missing input', () => {
    expect(isTuesday('not-a-date')).toBe(false);
    expect(isTuesday('')).toBe(false);
    expect(isTuesday(null)).toBe(false);
    expect(isTuesday()).toBe(false);
  });
});
