import { describe, expect, it, vi } from 'vitest';
import { createTtlCache } from './createTtlCache.js';

describe('createTtlCache', () => {
  it('stores values until they expire', () => {
    let time = 0;
    const cache = createTtlCache<string, number>({ ttlMs: 100, now: () => time });
    cache.set('a', 1);
    expect(cache.get('a')).toBe(1);
    expect(cache.has('a')).toBe(true);
    time = 100;
    expect(cache.get('a')).toBeUndefined();
    expect(cache.has('a')).toBe(false);
  });

  it('drops the oldest entry above maxEntries', () => {
    const cache = createTtlCache<string, number>({ ttlMs: 1000, maxEntries: 2 });
    cache.set('a', 1);
    cache.set('b', 2);
    cache.set('a', 3); // re-setting moves "a" to the end
    cache.set('c', 4);
    expect(cache.has('b')).toBe(false);
    expect(cache.get('a')).toBe(3);
    expect(cache.get('c')).toBe(4);
  });

  it('deletes and clears', () => {
    const cache = createTtlCache<string, number>({ ttlMs: 1000, maxEntries: 0 });
    cache.set('a', 1);
    cache.set('b', 2);
    cache.delete('a');
    expect(cache.has('a')).toBe(false);
    cache.clear();
    expect(cache.has('b')).toBe(false);
  });

  it('getOrSet shares an in-flight load and caches its result', async () => {
    const cache = createTtlCache<string, string>({ ttlMs: 1000 });
    const load = vi.fn(async () => 'me');
    const [a, b] = await Promise.all([cache.getOrSet('t', load), cache.getOrSet('t', load)]);
    expect([a, b]).toEqual(['me', 'me']);
    await expect(cache.getOrSet('t', load)).resolves.toBe('me');
    expect(load).toHaveBeenCalledTimes(1);
  });

  it('getOrSet caches nothing when the load rejects', async () => {
    const cache = createTtlCache<string, string>({ ttlMs: 1000 });
    await expect(cache.getOrSet('t', () => Promise.reject(new Error('x')))).rejects.toThrow('x');
    expect(cache.has('t')).toBe(false);
    await expect(cache.getOrSet('t', () => 'ok')).resolves.toBe('ok');
  });

  it('getOrSet skips the write when the key is deleted while loading', async () => {
    const cache = createTtlCache<string, string>({ ttlMs: 1000 });
    let resolve: (value: string) => void = () => undefined;
    const promise = cache.getOrSet('t', () => new Promise<string>((r) => (resolve = r)));
    cache.delete('t');
    resolve('late');
    await expect(promise).resolves.toBe('late');
    expect(cache.has('t')).toBe(false);

    let reject: (error: Error) => void = () => undefined;
    const failing = cache.getOrSet('u', () => new Promise<string>((_, r) => (reject = r)));
    cache.clear();
    reject(new Error('late failure'));
    await expect(failing).rejects.toThrow('late failure');
  });
});
