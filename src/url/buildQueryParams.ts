import { serializeQueryValue } from './internal/serializeQueryValue.js';

export interface BuildQueryParamsOptions {
  /** Keys to leave out of the query string. Defaults to none. */
  ignore?: readonly string[];
  /** Prepend `"?"` when the result is non-empty. Defaults to `true`. */
  prefix?: boolean;
  /** Also skip empty strings (`?search=`). Defaults to `false`. */
  skipEmpty?: boolean;
}

/**
 * Serialize an object into a URL query string. Skips `null`/`undefined`
 * values (and `""` with `skipEmpty`), expands arrays into repeated keys,
 * writes a `Date` as ISO 8601 and a plain object as JSON, and returns `""`
 * when nothing is left to encode (so it is safe to append to any URL).
 *
 * To patch the query of an existing URL instead, use {@link buildQueryUrl}.
 *
 * Round-trips with {@link parseQueryParams}.
 *
 * @example
 * buildQueryParams({ page: 1, search: "abc" }) // "?page=1&search=abc"
 * buildQueryParams({ id: [1, 2] }) // "?id=1&id=2"
 * buildQueryParams({ page: 1, with: "user" }, { ignore: ["with"] }) // "?page=1"
 * buildQueryParams({ page: 1 }, { prefix: false }) // "page=1"
 * buildQueryParams({ page: null }) // ""
 * buildQueryParams({ search: "" }, { skipEmpty: true }) // ""
 */
export function buildQueryParams(
  params?: Record<string, unknown> | null,
  options: BuildQueryParamsOptions = {},
): string {
  if (!params) {
    return '';
  }

  const { ignore = [], prefix = true, skipEmpty = false } = options;
  const ignored = new Set(ignore);
  const searchParams = new URLSearchParams();

  const append = (key: string, value: unknown) => {
    const serialized = serializeQueryValue(value);
    if (serialized !== undefined && (serialized !== '' || !skipEmpty)) {
      searchParams.append(key, serialized);
    }
  };

  for (const [key, value] of Object.entries(params)) {
    if (ignored.has(key)) {
      continue;
    }
    for (const item of Array.isArray(value) ? value : [value]) {
      append(key, item);
    }
  }

  const query = searchParams.toString();
  if (!query) {
    return '';
  }

  return prefix ? `?${query}` : query;
}
