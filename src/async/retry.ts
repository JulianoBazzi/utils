import { sleep } from './sleep.js';

/** Thrown by {@link retry} when every attempt failed; `cause` is the last error. */
export class RetryError extends Error {
  readonly attempts: number;

  constructor(attempts: number, cause: unknown) {
    super(`Failed after ${attempts} attempt${attempts === 1 ? '' : 's'}`, { cause });
    this.name = 'RetryError';
    this.attempts = attempts;
  }
}

export interface RetryContext {
  /** 1-based attempt number. */
  attempt: number;
  /** The `signal` passed to `retry`, to forward to `fetch` and friends. */
  signal?: AbortSignal;
}

export interface RetryOptions {
  /** Total attempts, the first one included. Defaults to `3`. */
  attempts?: number;
  /** Wait between attempts: a fixed number of ms or `(attempt, error) => ms`. Defaults to `0`. */
  delayMs?: number | ((attempt: number, error: unknown) => number);
  /** Stops retrying (and rethrows) when aborted, including during the wait. */
  signal?: AbortSignal;
  /** Return `false` to stop and rethrow the error as is (e.g. a 4xx). Defaults to always retry. */
  shouldRetry?: (error: unknown, attempt: number) => boolean;
  /** Called before each new attempt, e.g. to log or report progress. */
  onRetry?: (error: unknown, attempt: number) => void;
}

/**
 * Run `fn` until it succeeds, up to `attempts` times, waiting `delayMs`
 * between attempts. When every attempt fails, rejects with a
 * {@link RetryError} whose `cause` is the last error. An abort, or an error
 * `shouldRetry` declines, is rethrown as is.
 *
 * @example
 * await retry(() => loadModels(), { attempts: 3, delayMs: 2000 });
 * await retry(({ signal }) => fetch(url, { signal }), {
 *   signal: controller.signal,
 *   delayMs: (attempt) => 500 * 2 ** attempt,
 *   shouldRetry: (error) => getHttpStatus(error) !== 404,
 * });
 */
export async function retry<T>(
  fn: (context: RetryContext) => Promise<T> | T,
  options: RetryOptions = {},
): Promise<T> {
  const { attempts = 3, delayMs = 0, signal, shouldRetry, onRetry } = options;
  const total = Math.max(1, Math.floor(attempts));
  let lastError: unknown;

  for (let attempt = 1; attempt <= total; attempt += 1) {
    if (signal?.aborted) {
      throw signal.reason;
    }
    try {
      return await fn({ attempt, signal });
    } catch (error) {
      if (signal?.aborted || (shouldRetry && !shouldRetry(error, attempt))) {
        throw error;
      }
      lastError = error;
      if (attempt < total) {
        onRetry?.(error, attempt);
        await sleep(typeof delayMs === 'function' ? delayMs(attempt, error) : delayMs, { signal });
      }
    }
  }

  throw new RetryError(total, lastError);
}
