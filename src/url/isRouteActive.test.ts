import { describe, expect, it } from 'vitest';
import { isRouteActive } from './isRouteActive.js';

describe('isRouteActive', () => {
  describe('★ contrato nextjs-utils (useActiveRoute)', () => {
    it('matches by segment', () => {
      expect(isRouteActive('/settings/profile', '/settings')).toBe(true);
      expect(isRouteActive('/settings-old', '/settings')).toBe(false);
    });

    it('matches the root only exactly', () => {
      expect(isRouteActive('/a', '/')).toBe(false);
      expect(isRouteActive('/', '/')).toBe(true);
    });

    it('ignores a trailing slash', () => {
      expect(isRouteActive('/a/', '/a', { exact: true })).toBe(true);
    });

    it('never matches an href that is only a query', () => {
      expect(isRouteActive('/a', '?x=1')).toBe(false);
    });

    it('returns false without a pathname', () => {
      expect(isRouteActive(null, '/a')).toBe(false);
    });
  });

  it('ignores query and hash on both sides', () => {
    expect(isRouteActive('/a/b?tab=1#top', '/a?x=1')).toBe(true);
    expect(isRouteActive('/a', '#top')).toBe(false);
    expect(isRouteActive('/a', '')).toBe(false);
    expect(isRouteActive('//', '/')).toBe(true);
  });

  it('respects exact', () => {
    expect(isRouteActive('/a/b', '/a', { exact: true })).toBe(false);
    expect(isRouteActive('/a', '/a', { exact: true })).toBe(true);
  });
});
