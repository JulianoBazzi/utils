import { describe, expect, it, vi } from 'vitest';
import { onceAsync } from './onceAsync.js';

describe('onceAsync', () => {
  it('shares one promise between calls', async () => {
    const fn = vi.fn(async () => 'models');
    const once = onceAsync(fn);
    const [a, b] = await Promise.all([once.run(), once.run()]);
    expect([a, b]).toEqual(['models', 'models']);
    await once.run();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('retries after a failure', async () => {
    const fn = vi.fn().mockRejectedValueOnce(new Error('offline')).mockResolvedValue('ok');
    const once = onceAsync(fn);
    await expect(once.run()).rejects.toThrow('offline');
    await expect(once.run()).resolves.toBe('ok');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('starts over after reset, and a stale failure does not clear the new load', async () => {
    let rejectFirst: (error: Error) => void = () => undefined;
    const fn = vi
      .fn()
      .mockImplementationOnce(() => new Promise((_, reject) => (rejectFirst = reject)))
      .mockResolvedValue('second');
    const once = onceAsync(fn);

    const first = once.run();
    once.reset();
    const second = once.run();
    rejectFirst(new Error('stale'));
    await expect(first).rejects.toThrow('stale');
    await expect(second).resolves.toBe('second');
    expect(once.run()).toBe(second);
  });
});
