import { describe, expect, it } from 'vitest';
import { buildInstagramUrl } from './buildInstagramUrl.js';

describe('buildInstagramUrl', () => {
  it('builds a profile URL', () => {
    expect(buildInstagramUrl('julianobazzi')).toBe('https://instagram.com/julianobazzi');
  });

  it('strips a leading @ and trims', () => {
    expect(buildInstagramUrl('  @julianobazzi ')).toBe('https://instagram.com/julianobazzi');
  });

  it('encodes the handle so it cannot alter the path or query', () => {
    expect(buildInstagramUrl('foo?x=1#y')).toBe('https://instagram.com/foo%3Fx%3D1%23y');
    expect(buildInstagramUrl('../../evil')).toBe('https://instagram.com/..%2F..%2Fevil');
  });

  it('returns empty string for missing input', () => {
    expect(buildInstagramUrl()).toBe('');
    expect(buildInstagramUrl('@')).toBe('');
  });

  it('returns the fallback for missing input', () => {
    expect(buildInstagramUrl(null, { fallback: '#' })).toBe('#');
  });
});

describe('buildInstagramUrl — 1.3 additions', () => {
  it('returns undefined when the fallback is explicitly undefined', () => {
    const href: string | undefined = buildInstagramUrl(null, { fallback: undefined });
    expect(href).toBeUndefined();
    expect(buildInstagramUrl('bazzi', { fallback: undefined })).toBe('https://instagram.com/bazzi');
  });
});
