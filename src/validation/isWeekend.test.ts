import { describe, expect, it } from 'vitest';
import { isWeekend } from './isWeekend.js';

describe('isWeekend', () => {
  it('accepts Saturday and Sunday', () => {
    expect(isWeekend('2026-07-11')).toBe(true);
    expect(isWeekend('2026-07-05')).toBe(true);
    expect(isWeekend(new Date(2026, 6, 5))).toBe(true);
  });

  it('rejects weekdays', () => {
    expect(isWeekend('2026-07-06')).toBe(false);
    expect(isWeekend('2026-07-10')).toBe(false);
  });

  it('rejects garbage and missing input', () => {
    expect(isWeekend('not-a-date')).toBe(false);
    expect(isWeekend('')).toBe(false);
    expect(isWeekend(null)).toBe(false);
    expect(isWeekend()).toBe(false);
  });
});
