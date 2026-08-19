// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { openInNewTab } from './openInNewTab.js';

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('openInNewTab', () => {
  it('always applies the security features', () => {
    const open = vi.spyOn(window, 'open').mockReturnValue(null);

    openInNewTab('https://example.com');

    expect(open).toHaveBeenCalledWith('https://example.com', '_blank', 'noopener,noreferrer');
  });

  it('appends extra features and honours a custom target', () => {
    const open = vi.spyOn(window, 'open').mockReturnValue(null);

    openInNewTab('https://example.com', { target: 'report', features: 'width=600' });

    expect(open).toHaveBeenCalledWith(
      'https://example.com',
      'report',
      'noopener,noreferrer,width=600',
    );
  });

  it('returns the opened window', () => {
    const opened = {} as Window;
    vi.spyOn(window, 'open').mockReturnValue(opened);

    expect(openInNewTab('https://example.com')).toBe(opened);
  });

  it('returns null for missing input without opening anything', () => {
    const open = vi.spyOn(window, 'open').mockReturnValue(null);

    expect(openInNewTab()).toBeNull();
    expect(openInNewTab(null)).toBeNull();
    expect(openInNewTab('')).toBeNull();
    expect(open).not.toHaveBeenCalled();
  });

  it('returns null when there is no window (SSR)', () => {
    vi.stubGlobal('window', undefined);

    expect(openInNewTab('https://example.com')).toBeNull();
  });
});
