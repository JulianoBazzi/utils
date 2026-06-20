import { describe, expect, it } from 'vitest';
import { formatSecondsToDuration } from './formatSecondsToDuration.js';

describe('formatSecondsToDuration', () => {
  it('renders sub-minute values as seconds', () => {
    expect(formatSecondsToDuration(30)).toBe('30s');
  });

  it('rounds values >= 60s to whole minutes', () => {
    expect(formatSecondsToDuration(90)).toBe('2 min');
    expect(formatSecondsToDuration(2700)).toBe('45 min');
  });

  it('formats hours', () => {
    expect(formatSecondsToDuration(3600)).toBe('1h');
    expect(formatSecondsToDuration(5400)).toBe('1h e 30 min');
  });

  it('supports the spaced option', () => {
    expect(formatSecondsToDuration(30, { spaced: true })).toBe('30 s');
    expect(formatSecondsToDuration(3600, { spaced: true })).toBe('1 h');
  });

  it('returns the fallback for missing input', () => {
    expect(formatSecondsToDuration()).toBe('');
    expect(formatSecondsToDuration(null, { fallback: 'Não Informado' })).toBe('Não Informado');
  });
});
