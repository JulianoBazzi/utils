import { describe, expect, it, vi } from 'vitest';
import { createServerTiming } from './createServerTiming.js';
import { getCookie } from './getCookie.js';
import { readJsonCookie } from './readJsonCookie.js';
import { redirectTo } from './redirectTo.js';

describe('redirectTo', () => {
  it('builds a temporary redirect by default', () => {
    expect(redirectTo('/login')).toEqual({ redirect: { destination: '/login', permanent: false } });
    expect(redirectTo('/home', true).redirect.permanent).toBe(true);
  });
});

describe('getCookie', () => {
  const header = 'a=1; token=abc%20def; quoted="x"; bad=%E0%A4%A';

  it('reads a raw header, decoding values', () => {
    expect(getCookie('token', header)).toBe('abc def');
    expect(getCookie('quoted', header)).toBe('x');
    expect(getCookie('bad', header)).toBe('%E0%A4%A');
    expect(getCookie('missing', header)).toBeUndefined();
  });

  it('reads IncomingMessage-like and Headers-like requests', () => {
    expect(getCookie('a', { headers: { cookie: header } })).toBe('1');
    expect(getCookie('a', { headers: { cookie: ['a=2', 'b=3'] } })).toBe('2');
    expect(getCookie('a', { headers: {} })).toBeUndefined();
    expect(getCookie('a', { headers: new Headers({ cookie: 'a=4' }) })).toBe('4');
    expect(getCookie('a', { headers: new Headers() })).toBeUndefined();
  });

  it('reads a cookies() store', () => {
    const store = { get: (name: string) => (name === 'a' ? { value: 'v' } : undefined) };
    expect(getCookie('a', store)).toBe('v');
    expect(getCookie('b', store)).toBeUndefined();
  });

  it('returns undefined on the server without a source', () => {
    expect(getCookie('a')).toBeUndefined();
  });

  it('reads document.cookie in the browser', () => {
    vi.stubGlobal('document', { cookie: 'a=browser' });
    try {
      expect(getCookie('a')).toBe('browser');
    } finally {
      vi.unstubAllGlobals();
    }
  });
});

describe('readJsonCookie', () => {
  it('parses JSON cookies and returns null otherwise', () => {
    const header = `store=${encodeURIComponent(JSON.stringify({ id: 1 }))}; broken=%7Bx`;
    expect(readJsonCookie<{ id: number }>('store', header)).toEqual({ id: 1 });
    expect(readJsonCookie('broken', header)).toBeNull();
    expect(readJsonCookie('missing', header)).toBeNull();
  });
});

describe('createServerTiming', () => {
  it('measures sync and async work and builds the header', async () => {
    const now = vi.spyOn(performance, 'now');
    now
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(12.34)
      .mockReturnValueOnce(20)
      .mockReturnValueOnce(60.06);
    const timing = createServerTiming();
    await expect(timing.measure('getMe', () => 'me')).resolves.toBe('me');
    await expect(timing.measure('entities list', async () => 2)).resolves.toBe(2);
    expect(timing.header()).toBe('getMe;dur=12.3, entities_list;dur=40.1');
    now.mockRestore();
  });

  it('records the duration even when the work throws', async () => {
    const timing = createServerTiming();
    await expect(
      timing.measure('', () => {
        throw new Error('boom');
      }),
    ).rejects.toThrow('boom');
    expect(timing.header()).toMatch(/^metric;dur=\d+\.\d$/);
  });

  it('applies the header only when there are metrics', async () => {
    const response = { setHeader: vi.fn() };
    const timing = createServerTiming();
    timing.apply(response);
    expect(response.setHeader).not.toHaveBeenCalled();
    await timing.measure('a', () => 1);
    timing.apply(response);
    expect(response.setHeader).toHaveBeenCalledWith(
      'Server-Timing',
      expect.stringMatching(/^a;dur=/),
    );
  });
});
