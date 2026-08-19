export interface BuildQueryParamsOptions {
  /** Keys to leave out of the query string. Defaults to none. */
  ignore?: string[];
  /** Prepend `"?"` when the result is non-empty. Defaults to `true`. */
  prefix?: boolean;
}

/**
 * Serialize an object into a URL query string. Skips `null`/`undefined`
 * values, expands arrays into repeated keys, and returns `""` when nothing is
 * left to encode (so it is safe to append to any URL).
 *
 * Round-trips with {@link parseQueryParams}.
 *
 * @example
 * buildQueryParams({ page: 1, search: "abc" }) // "?page=1&search=abc"
 * buildQueryParams({ id: [1, 2] }) // "?id=1&id=2"
 * buildQueryParams({ page: 1, with: "user" }, { ignore: ["with"] }) // "?page=1"
 * buildQueryParams({ page: 1 }, { prefix: false }) // "page=1"
 * buildQueryParams({ page: null }) // ""
 */
export function buildQueryParams(
  params?: Record<string, unknown> | null,
  options: BuildQueryParamsOptions = {},
): string {
  if (!params) {
    return '';
  }

  const { ignore = [], prefix = true } = options;
  const ignored = new Set(ignore);
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (ignored.has(key) || value == null) {
      continue;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        if (item != null) {
          searchParams.append(key, String(item));
        }
      }

      continue;
    }

    searchParams.append(key, String(value));
  }

  const query = searchParams.toString();
  if (!query) {
    return '';
  }

  return prefix ? `?${query}` : query;
}
