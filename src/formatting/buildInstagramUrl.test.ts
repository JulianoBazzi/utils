import { describe, expect, it } from 'vitest';
import { buildInstagramUrl } from './buildInstagramUrl.js';

describe('buildInstagramUrl', () => {
  it('builds a profile URL', () => {
    expect(buildInstagramUrl('julianobazzi')).toBe('https://instagram.com/julianobazzi');
  });

  it('strips a leading @ and trims', () => {
    expect(buildInstagramUrl('  @julianobazzi ')).toBe('https://instagram.com/julianobazzi');
  });

  it('returns empty string for missing input', () => {
    expect(buildInstagramUrl()).toBe('');
    expect(buildInstagramUrl('@')).toBe('');
  });

  it('returns the fallback for missing input', () => {
    expect(buildInstagramUrl(null, { fallback: '#' })).toBe('#');
  });
});
