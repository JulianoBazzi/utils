import { describe, expect, it, vi } from 'vitest';
import { RetryError, retry } from './retry.js';

describe('retry', () => {
  it('returns the first successful result', async () => {
    const fn = vi.fn().mockRejectedValueOnce(new Error('a')).mockResolvedValueOnce('ok');
    const onRetry = vi.fn();
    await expect(retry(fn, { onRetry })).resolves.toBe('ok');
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenNthCalledWith(2, { attempt: 2, signal: undefined });
    expect(onRetry).toHaveBeenCalledWith(expect.any(Error), 1);
  });

  it('throws a RetryError with the last error after every attempt', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('down'));
    const error = await retry(fn, { attempts: 2 }).catch((e: unknown) => e);
    expect(error).toBeInstanceOf(RetryError);
    expect(error).toMatchObject({
      name: 'RetryError',
      attempts: 2,
      message: 'Failed after 2 attempts',
    });
    expect((error as RetryError).cause).toEqual(new Error('down'));
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('runs at least once', async () => {
    const error = await retry(() => Promise.reject(new Error('x')), { attempts: 0 }).catch(
      (e: unknown) => e,
    );
    expect(error).toMatchObject({ attempts: 1, message: 'Failed after 1 attempt' });
  });

  it('waits delayMs between attempts, fixed or computed', async () => {
    vi.useFakeTimers();
    try {
      const delays: number[] = [];
      const fn = vi.fn().mockRejectedValueOnce(new Error('a')).mockResolvedValue('ok');
      const promise = retry(fn, {
        delayMs: (attempt) => {
          delays.push(attempt);
          return 500;
        },
      });
      await vi.advanceTimersByTimeAsync(500);
      await expect(promise).resolves.toBe('ok');
      expect(delays).toEqual([1]);

      const fixed = retry(vi.fn().mockRejectedValueOnce(new Error('a')).mockResolvedValue(1), {
        delayMs: 100,
      });
      await vi.advanceTimersByTimeAsync(100);
      await expect(fixed).resolves.toBe(1);
    } finally {
      vi.useRealTimers();
    }
  });

  it('rethrows errors that shouldRetry declines', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('404'));
    await expect(retry(fn, { shouldRetry: () => false })).rejects.toThrow('404');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('stops on abort', async () => {
    const controller = new AbortController();
    controller.abort(new Error('aborted'));
    await expect(retry(() => 'never', { signal: controller.signal })).rejects.toThrow('aborted');

    const live = new AbortController();
    const fn = vi.fn(async () => {
      live.abort(new Error('mid-flight'));
      throw new Error('request failed');
    });
    await expect(retry(fn, { signal: live.signal })).rejects.toThrow('request failed');
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
