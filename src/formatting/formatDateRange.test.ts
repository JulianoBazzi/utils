import { describe, expect, it } from 'vitest';
import { formatDateRange } from './formatDateRange.js';

describe('formatDateRange', () => {
  it('joins two dates with the separator', () => {
    expect(formatDateRange('2024-01-01', '2024-01-31')).toBe('01/01/24 a 31/01/24');
    expect(formatDateRange('2024-01-01', '2024-01-31', { separator: ' – ', year: 'numeric' })).toBe(
      '01/01/2024 – 31/01/2024',
    );
  });

  it('renders the same day once', () => {
    expect(formatDateRange('2024-01-01', '2024-01-01T18:00')).toBe('01/01/24');
  });

  it('handles an open end', () => {
    expect(formatDateRange('2024-01-01', null, { openEnd: 'em diante' })).toBe(
      '01/01/24 em diante',
    );
    expect(formatDateRange('2024-01-01', null, { fallback: 'Ocasional' })).toBe('Ocasional');
  });

  it('returns the fallback without a valid start', () => {
    expect(formatDateRange(null, '2024-01-31', { fallback: 'Ocasional' })).toBe('Ocasional');
    expect(formatDateRange('2024-02-30', '2024-03-01')).toBe('');
  });
});
