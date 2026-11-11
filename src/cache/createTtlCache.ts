export interface CreateTtlCacheOptions {
  /** How long an entry lives, in milliseconds. */
  ttlMs: number;
  /** Keep at most this many entries, dropping the oldest. Defaults to unlimited. */
  maxEntries?: number;
  /** Clock, for tests. Defaults to `Date.now`. */
  now?: () => number;
}

export interface TtlCache<K, V> {
  get(key: K): V | undefined;
  set(key: K, value: V): void;
  has(key: K): boolean;
  delete(key: K): void;
  clear(): void;
  /**
   * Return the cached value, or run `load` and cache its result. Concurrent
   * calls for the same key share one `load`; a rejected load caches nothing.
   */
  getOrSet(key: K, load: () => Promise<V> | V): Promise<V>;
}

/**
 * Small in-memory cache whose entries expire after `ttlMs` — e.g. to avoid
 * fetching `/me` on every server render. `getOrSet` deduplicates loads in
 * flight. Entries live in the module that creates the cache; on serverless
 * platforms each instance has its own.
 *
 * @example
 * const meCache = createTtlCache<string, User>({ ttlMs: 30_000, maxEntries: 500 });
 * const me = await meCache.getOrSet(token, () => api.getMe(token));
 */
export function createTtlCache<K, V>(options: CreateTtlCacheOptions): TtlCache<K, V> {
  const { ttlMs, maxEntries, now = Date.now } = options;
  const entries = new Map<K, { value: V; expiresAt: number }>();
  const pending = new Map<K, Promise<V>>();

  const read = (key: K) => {
    const entry = entries.get(key);
    if (entry && entry.expiresAt <= now()) {
      entries.delete(key);
      return undefined;
    }
    return entry;
  };

  const set = (key: K, value: V) => {
    entries.delete(key);
    entries.set(key, { value, expiresAt: now() + ttlMs });
    if (maxEntries !== undefined && maxEntries > 0 && entries.size > maxEntries) {
      entries.delete(entries.keys().next().value as K);
    }
  };

  return {
    get: (key) => read(key)?.value,
    has: (key) => read(key) !== undefined,
    set,
    delete(key) {
      entries.delete(key);
      pending.delete(key);
    },
    clear() {
      entries.clear();
      pending.clear();
    },
    getOrSet(key, load) {
      const hit = read(key);
      if (hit) {
        return Promise.resolve(hit.value);
      }
      const inFlight = pending.get(key);
      if (inFlight) {
        return inFlight;
      }

      const promise: Promise<V> = (async () => load())().then(
        (value) => {
          // Skip the write if delete()/clear() ran while loading.
          if (pending.get(key) === promise) {
            pending.delete(key);
            set(key, value);
          }
          return value;
        },
        (error: unknown) => {
          if (pending.get(key) === promise) {
            pending.delete(key);
          }
          throw error;
        },
      );
      pending.set(key, promise);
      return promise;
    },
  };
}
