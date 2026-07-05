import { describe, expect, it } from 'vitest';
import { buildFacebookUrl } from './buildFacebookUrl.js';

describe('buildFacebookUrl', () => {
  it('builds a profile URL', () => {
    expect(buildFacebookUrl('julianobazzi')).toBe('https://facebook.com/julianobazzi');
  });

  it('strips a leading @ and trims', () => {
    expect(buildFacebookUrl('  @julianobazzi ')).toBe('https://facebook.com/julianobazzi');
  });

  it('returns empty string for missing input', () => {
    expect(buildFacebookUrl()).toBe('');
    expect(buildFacebookUrl('@')).toBe('');
  });

  it('returns the fallback for missing input', () => {
    expect(buildFacebookUrl(null, { fallback: '#' })).toBe('#');
  });
});
