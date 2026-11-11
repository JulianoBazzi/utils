import { afterEach, describe, expect, it, vi } from 'vitest';
import { sleep } from './sleep.js';

describe('sleep', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('resolves after the delay and removes its abort listener', async () => {
    vi.useFakeTimers();
    const controller = new AbortController();
    const remove = vi.spyOn(controller.signal, 'removeEventListener');
    const done = vi.fn();

    const promise = sleep(1000, { signal: controller.signal }).then(done);
    await vi.advanceTimersByTimeAsync(999);
    expect(done).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    await promise;
    expect(done).toHaveBeenCalled();
    expect(remove).toHaveBeenCalledWith('abort', expect.any(Function));
  });

  it('rejects at once when the signal is already aborted', async () => {
    const controller = new AbortController();
    controller.abort(new Error('stop'));
    await expect(sleep(10_000, { signal: controller.signal })).rejects.toThrow('stop');
  });

  it('rejects when aborted while waiting', async () => {
    vi.useFakeTimers();
    const controller = new AbortController();
    const promise = sleep(10_000, { signal: controller.signal });
    controller.abort(new Error('cancelled'));
    await expect(promise).rejects.toThrow('cancelled');
  });

  it('treats a negative delay as 0', async () => {
    await expect(sleep(-5)).resolves.toBeUndefined();
  });
});
