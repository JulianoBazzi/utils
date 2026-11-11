export interface SleepOptions {
  /** Abort the wait: the promise rejects with `signal.reason`. */
  signal?: AbortSignal;
}

/**
 * Wait `ms` milliseconds. With a `signal`, an abort (or a signal that is
 * already aborted) rejects right away with `signal.reason`, and the abort
 * listener is always removed — no leak on long-lived signals.
 *
 * @example
 * await sleep(2000);
 * await sleep(2000, { signal: controller.signal });
 */
export function sleep(ms: number, options: SleepOptions = {}): Promise<void> {
  const { signal } = options;

  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason);
      return;
    }

    const onAbort = () => {
      clearTimeout(timer);
      reject(signal?.reason);
    };
    const timer = setTimeout(
      () => {
        signal?.removeEventListener('abort', onAbort);
        resolve();
      },
      Math.max(ms, 0),
    );
    signal?.addEventListener('abort', onAbort, { once: true });
  });
}
