import { describe, expect, it } from 'vitest';
import { buildQueryUrl } from './buildQueryUrl.js';

describe('buildQueryUrl', () => {
  describe('★ contrato nextjs-utils', () => {
    it('merges, replaces and removes keys', () => {
      expect(buildQueryUrl('/a?x=1', { y: 2 })).toBe('/a?x=1&y=2');
      expect(buildQueryUrl('/a?x=1&x=2', { x: 3 })).toBe('/a?x=3');
      expect(buildQueryUrl('/a?x=1', { x: '' })).toBe('/a');
    });

    it('drops non-finite numbers and keeps false and 0', () => {
      expect(buildQueryUrl('/a', { n: Number.NaN, b: false, z: 0 })).toBe('/a?b=false&z=0');
    });

    it('expands arrays, skipping empty items', () => {
      expect(buildQueryUrl('/a', { ids: [1, '', 2] })).toBe('/a?ids=1&ids=2');
    });

    it('keeps the hash unless keepHash is false', () => {
      expect(buildQueryUrl('/a?x=1#top', { x: 2 })).toBe('/a?x=2#top');
      expect(buildQueryUrl('/a?x=1#top', { x: 2 }, { keepHash: false })).toBe('/a?x=2');
    });

    it('writes dates as ISO', () => {
      expect(buildQueryUrl('/a', { d: new Date('2026-01-02T03:04:05Z') })).toBe(
        '/a?d=2026-01-02T03%3A04%3A05.000Z',
      );
    });

    it('leaves ignored keys alone', () => {
      expect(buildQueryUrl('/a?with=u', { with: 'x' }, { ignore: ['with'] })).toBe('/a?with=u');
    });
  });

  it('removes keys for null, undefined, invalid dates and empty arrays', () => {
    expect(
      buildQueryUrl('/a?a=1&b=2&c=3&d=4', {
        a: null,
        b: undefined,
        c: new Date('x'),
        d: [],
      }),
    ).toBe('/a');
  });

  it('splits at the first "?" and "#" only', () => {
    expect(buildQueryUrl('/a?next=/b?c=1#x#y', { page: 2 })).toBe(
      '/a?next=%2Fb%3Fc%3D1&page=2#x#y',
    );
  });
});
