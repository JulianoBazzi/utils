import { afterEach, describe, expect, it, vi } from 'vitest';
import { getDateRange } from './getDateRange.js';

describe('getDateRange', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns a single day for a 1-day window', () => {
    expect(getDateRange(1, { reference: '2026-07-21' })).toEqual({
      startDate: '2026-07-21',
      endDate: '2026-07-21',
    });
  });

  it('returns an inclusive window of N days', () => {
    expect(getDateRange(7, { reference: '2026-07-21' })).toEqual({
      startDate: '2026-07-15',
      endDate: '2026-07-21',
    });
    expect(getDateRange(30, { reference: '2026-07-21' })).toEqual({
      startDate: '2026-06-22',
      endDate: '2026-07-21',
    });
  });

  it('shifts the window back with offset', () => {
    expect(getDateRange(1, { reference: '2026-07-21', offset: 1 })).toEqual({
      startDate: '2026-07-20',
      endDate: '2026-07-20',
    });
    expect(getDateRange(7, { reference: '2026-07-21', offset: 7 })).toEqual({
      startDate: '2026-07-08',
      endDate: '2026-07-14',
    });
  });

  it('crosses month and year boundaries', () => {
    expect(getDateRange(5, { reference: '2026-01-02' })).toEqual({
      startDate: '2025-12-29',
      endDate: '2026-01-02',
    });
  });

  it('accepts a Date reference', () => {
    expect(getDateRange(3, { reference: new Date(2026, 6, 21) })).toEqual({
      startDate: '2026-07-19',
      endDate: '2026-07-21',
    });
  });

  it('treats zero and negative spans as a single day', () => {
    expect(getDateRange(0, { reference: '2026-07-21' })).toEqual({
      startDate: '2026-07-21',
      endDate: '2026-07-21',
    });
    expect(getDateRange(-5, { reference: '2026-07-21' })).toEqual({
      startDate: '2026-07-21',
      endDate: '2026-07-21',
    });
  });

  it('defaults to today when no reference is given', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 6, 21, 12));

    expect(getDateRange(2)).toEqual({ startDate: '2026-07-20', endDate: '2026-07-21' });
    expect(getDateRange(1, { reference: null })).toEqual({
      startDate: '2026-07-21',
      endDate: '2026-07-21',
    });
  });
});
