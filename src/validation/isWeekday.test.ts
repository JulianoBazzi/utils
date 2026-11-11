import { describe, expect, it } from 'vitest';
import { isWeekday } from './isWeekday.js';

describe('isWeekday', () => {
  it('accepts Monday to Friday', () => {
    expect(isWeekday('2026-07-06')).toBe(true);
    expect(isWeekday('2026-07-08')).toBe(true);
    expect(isWeekday('2026-07-10')).toBe(true);
    expect(isWeekday(new Date(2026, 6, 10))).toBe(true);
  });

  it('rejects Saturday and Sunday', () => {
    expect(isWeekday('2026-07-05')).toBe(false);
    expect(isWeekday('2026-07-11')).toBe(false);
  });

  it('rejects garbage and missing input', () => {
    expect(isWeekday('not-a-date')).toBe(false);
    expect(isWeekday('')).toBe(false);
    expect(isWeekday(null)).toBe(false);
    expect(isWeekday()).toBe(false);
  });
});

describe('isWeekday — 1.3 additions', () => {
  it('works with .filter (the index is ignored)', () => {
    expect(['2026-07-05', '2026-07-06', '2026-07-07'].filter(isWeekday)).toEqual([
      '2026-07-06',
      '2026-07-07',
    ]);
  });

  it('reads instants in the given time zone', () => {
    // 02:00 UTC on Monday is still Sunday evening in São Paulo.
    expect(isWeekday('2026-07-06T02:00:00Z', { timeZone: 'UTC' })).toBe(true);
    expect(isWeekday('2026-07-06T02:00:00Z', { timeZone: 'America/Sao_Paulo' })).toBe(false);
  });
});
