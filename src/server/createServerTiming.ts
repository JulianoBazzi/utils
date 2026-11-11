export interface ServerTiming {
  /** Time `fn` (sync or async) under `name`. Recorded even when `fn` throws; the error is rethrown. */
  measure<T>(name: string, fn: () => T | Promise<T>): Promise<T>;
  /** The `Server-Timing` header value, e.g. `"getMe;dur=12.3, entities;dur=40.1"`. */
  header(): string;
  /** Set the header on a Node response (`getServerSideProps`, API routes); no-op when empty. */
  apply(response: { setHeader(name: string, value: string): void }): void;
}

/**
 * Collect `Server-Timing` metrics for a request, shown per request in the
 * browser's network panel. Names are sanitized to HTTP tokens (`[^\w-]` →
 * `_`); durations have one decimal. In the App Router, put `header()` on a
 * `NextResponse`.
 *
 * @example
 * const timing = createServerTiming();
 * const me = await timing.measure("getMe", () => api.getMe());
 * timing.apply(context.res);
 */
export function createServerTiming(): ServerTiming {
  const metrics: string[] = [];
  const header = () => metrics.join(', ');

  return {
    async measure(name, fn) {
      const start = performance.now();
      try {
        return await fn();
      } finally {
        const token = name.replace(/[^\w-]/g, '_') || 'metric';
        metrics.push(`${token};dur=${(performance.now() - start).toFixed(1)}`);
      }
    },
    header,
    apply(response) {
      const value = header();
      if (value) {
        response.setHeader('Server-Timing', value);
      }
    },
  };
}
