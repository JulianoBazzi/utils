import { describe, expect, it } from 'vitest';
import { buildFacebookUrl } from './buildFacebookUrl.js';

describe('buildFacebookUrl', () => {
  it('builds a profile URL', () => {
    expect(buildFacebookUrl('julianobazzi')).toBe('https://facebook.com/julianobazzi');
  });

  it('strips a leading @ and trims', () => {
    expect(buildFacebookUrl('  @julianobazzi ')).toBe('https://facebook.com/julianobazzi');
  });

  it('encodes the handle so it cannot alter the path or query', () => {
    expect(buildFacebookUrl('foo?x=1#y')).toBe('https://facebook.com/foo%3Fx%3D1%23y');
  });

  it('returns empty string for missing input', () => {
    expect(buildFacebookUrl()).toBe('');
    expect(buildFacebookUrl('@')).toBe('');
  });

  it('returns the fallback for missing input', () => {
    expect(buildFacebookUrl(null, { fallback: '#' })).toBe('#');
  });
});

describe('buildFacebookUrl — 1.3 additions', () => {
  it('returns undefined when the fallback is explicitly undefined', () => {
    const href: string | undefined = buildFacebookUrl(null, { fallback: undefined });
    expect(href).toBeUndefined();
    expect(buildFacebookUrl('bazzi', { fallback: undefined })).toBe('https://facebook.com/bazzi');
  });
});
