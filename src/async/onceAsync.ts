export interface OnceAsync<T> {
  /** Start `fn` on the first call; later calls share the same promise. */
  run(): Promise<T>;
  /** Forget the stored promise, so the next `run()` starts over. */
  reset(): void;
}

/**
 * Memoize an async loader: every `run()` shares one in-flight or resolved
 * promise. A failure clears it so the next `run()` tries again — but only if
 * it is still the current promise, so a stale failure never wipes a newer
 * load started after `reset()`.
 *
 * @example
 * const models = onceAsync(() => loadFaceModels());
 * await models.run(); // loads
 * await models.run(); // reuses
 */
export function onceAsync<T>(fn: () => Promise<T> | T): OnceAsync<T> {
  let current: Promise<T> | null = null;

  return {
    run() {
      if (!current) {
        const promise = (async () => fn())();
        current = promise;
        promise.catch(() => {
          if (current === promise) {
            current = null;
          }
        });
      }
      return current;
    },
    reset() {
      current = null;
    },
  };
}
