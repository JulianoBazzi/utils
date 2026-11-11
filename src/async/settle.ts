/** Outcome of {@link settle}: the value, or the error, never a rejection. */
export type Settled<T> = { ok: true; value: T } | { ok: false; error: unknown };

/**
 * Turn a promise (or a function returning one) into `{ ok, value }` /
 * `{ ok: false, error }` — like one entry of `Promise.allSettled`, without the
 * `status` strings. A synchronous throw from the function is caught too.
 *
 * @example
 * const result = await settle(() => api.getUser(id));
 * if (result.ok) render(result.value);
 * else report(result.error);
 */
export async function settle<T>(input: Promise<T> | (() => Promise<T> | T)): Promise<Settled<T>> {
  try {
    const value = await (typeof input === 'function' ? input() : input);
    return { ok: true, value };
  } catch (error) {
    return { ok: false, error };
  }
}
