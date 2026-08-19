import { afterEach, describe, expect, it, vi } from 'vitest';
import { getMonthRange } from './getMonthRange.js';

describe('getMonthRange', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('covers a finished month end to end', () => {
    expect(getMonthRange('2026-06', { reference: '2026-07-21' })).toEqual({
      startDate: '2026-06-01',
      endDate: '2026-06-30',
    });
  });

  it('clamps an ongoing month to the reference date', () => {
    expect(getMonthRange('2026-07', { reference: '2026-07-21' })).toEqual({
      startDate: '2026-07-01',
      endDate: '2026-07-21',
    });
  });

  it('accepts a full date within the month', () => {
    expect(getMonthRange('2026-06-15', { reference: '2026-07-21' })).toEqual({
      startDate: '2026-06-01',
      endDate: '2026-06-30',
    });
  });

  it('handles February in a leap year', () => {
    expect(getMonthRange('2028-02', { reference: '2028-05-10' })).toEqual({
      startDate: '2028-02-01',
      endDate: '2028-02-29',
    });
  });

  it('accepts a Date reference', () => {
    expect(getMonthRange('2026-07', { reference: new Date(2026, 6, 10) })).toEqual({
      startDate: '2026-07-01',
      endDate: '2026-07-10',
    });
  });

  it('defaults to today when no reference is given', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 6, 21, 12));

    expect(getMonthRange('2026-07')).toEqual({ startDate: '2026-07-01', endDate: '2026-07-21' });
    expect(getMonthRange('2026-05', { reference: null })).toEqual({
      startDate: '2026-05-01',
      endDate: '2026-05-31',
    });
  });
});
