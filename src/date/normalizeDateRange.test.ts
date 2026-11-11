import { describe, expect, it } from 'vitest';
import { normalizeDateRange } from './normalizeDateRange.js';

const range = (startDate: string, endDate: string) => ({ startDate, endDate });

describe('normalizeDateRange', () => {
  it('keeps a valid range and swaps an inverted one', () => {
    expect(normalizeDateRange(range('2026-03-01', '2026-03-10'))).toEqual(
      range('2026-03-01', '2026-03-10'),
    );
    expect(normalizeDateRange(range('2026-03-10', '2026-03-01'))).toEqual(
      range('2026-03-01', '2026-03-10'),
    );
  });

  it('clamps into [min, max]', () => {
    const window = { min: '2026-02-01', max: '2026-03-05' };
    expect(normalizeDateRange(range('2026-01-01', '2026-03-10'), window)).toEqual(
      range('2026-02-01', '2026-03-05'),
    );
  });

  it('collapses to the nearest edge when the range falls outside', () => {
    expect(normalizeDateRange(range('2025-01-01', '2025-01-31'), { min: '2026-02-01' })).toEqual(
      range('2026-02-01', '2026-02-01'),
    );
    expect(normalizeDateRange(range('2027-01-01', '2027-01-31'), { max: '2026-03-05' })).toEqual(
      range('2026-03-05', '2026-03-05'),
    );
    expect(
      normalizeDateRange(range('2026-01-01', '2026-12-31'), {
        min: '2026-06-01',
        max: '2026-05-01',
      }),
    ).toEqual(range('2026-06-01', '2026-06-01'));
  });
});
