export interface TryOrNullOptions {
  /**
   * Which errors become `null`; the others are rethrown. Defaults to every
   * error — narrow it so outages are not mistaken for "not found", e.g.
   * `{ when: (error) => getHttpStatus(error) === 404 }`.
   */
  when?: (error: unknown) => boolean;
}

/**
 * Run `fn` and resolve `null` instead of rejecting — for "load or show the
 * empty state" pages. Restrict it with `when` so 401s, 5xx and framework
 * control-flow errors (Next's `redirect()`/`notFound()`) still propagate.
 *
 * @example
 * const user = await tryOrNull(() => api.getUser(id), {
 *   when: (error) => getHttpStatus(error) === 404,
 * });
 */
export async function tryOrNull<T>(
  fn: () => Promise<T> | T,
  options: TryOrNullOptions = {},
): Promise<T | null> {
  try {
    return await fn();
  } catch (error) {
    if (!options.when || options.when(error)) {
      return null;
    }
    throw error;
  }
}
