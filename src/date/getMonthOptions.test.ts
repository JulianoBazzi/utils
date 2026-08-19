import { afterEach, describe, expect, it, vi } from 'vitest';
import { getMonthOptions } from './getMonthOptions.js';

describe('getMonthOptions', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('lists months newest first, labelled in Portuguese', () => {
    expect(getMonthOptions({ count: 3, reference: '2026-07-21' })).toEqual([
      { id: '2026-07', name: 'Julho/2026' },
      { id: '2026-06', name: 'Junho/2026' },
      { id: '2026-05', name: 'Maio/2026' },
    ]);
  });

  it('walks back across the year boundary', () => {
    expect(getMonthOptions({ count: 2, reference: '2026-01-15' })).toEqual([
      { id: '2026-01', name: 'Janeiro/2026' },
      { id: '2025-12', name: 'Dezembro/2025' },
    ]);
  });

  it('drops months earlier than min', () => {
    expect(getMonthOptions({ count: 6, reference: '2026-07-21', min: '2026-06' })).toEqual([
      { id: '2026-07', name: 'Julho/2026' },
      { id: '2026-06', name: 'Junho/2026' },
    ]);
  });

  it('defaults to 12 months', () => {
    expect(getMonthOptions({ reference: '2026-07-21' })).toHaveLength(12);
  });

  it('returns an empty list for a non-positive count', () => {
    expect(getMonthOptions({ count: 0, reference: '2026-07-21' })).toEqual([]);
    expect(getMonthOptions({ count: -3, reference: '2026-07-21' })).toEqual([]);
  });

  it('accepts a Date reference', () => {
    expect(getMonthOptions({ count: 1, reference: new Date(2026, 6, 21) })).toEqual([
      { id: '2026-07', name: 'Julho/2026' },
    ]);
  });

  it('defaults to today when no reference is given', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 6, 21, 12));

    expect(getMonthOptions({ count: 1 })).toEqual([{ id: '2026-07', name: 'Julho/2026' }]);
    expect(getMonthOptions({ count: 1, reference: null })).toEqual([
      { id: '2026-07', name: 'Julho/2026' },
    ]);
    expect(getMonthOptions()).toHaveLength(12);
  });
});
