import { readQueryString } from './readQueryString.js';
import type { QuerySource } from './types.js';

export interface ReadQueryNumberOptions {
  /** Reject fractions. Defaults to `false`. */
  integer?: boolean;
  /** Smallest accepted value (inclusive); smaller → `undefined`, no clamping. */
  min?: number;
  /** Largest accepted value (inclusive); larger → `undefined`, no clamping. */
  max?: number;
}

/**
 * A plain decimal number (`"12"`, `"-1.5"`). Unlike `Number()`, rejects
 * `"1e3"`, `"0x10"`, `"Infinity"` and `""`.
 *
 * Never throws; a missing or invalid value comes back `undefined`, so apply
 * the default with `??`. Accepts any query source: `URLSearchParams`, a query
 * string, Pages Router `query` or App Router `searchParams`.
 *
 * @example
 * readQueryNumber("page=2", "page", { integer: true, min: 1 }) // 2
 * readQueryNumber("id=1.5", "id", { integer: true }) // undefined
 * readQueryNumber("id=-1", "id", { min: 1 }) // undefined
 */
export function readQueryNumber(
  query: QuerySource,
  key: string,
  options: ReadQueryNumberOptions = {},
): number | undefined {
  const { integer = false, min, max } = options;
  const value = readQueryString(query, key);
  const pattern = integer ? /^-?\d+$/ : /^-?\d+(\.\d+)?$/;
  if (value === undefined || !pattern.test(value)) {
    return undefined;
  }

  const number = Number(value);
  if ((min !== undefined && number < min) || (max !== undefined && number > max)) {
    return undefined;
  }
  return number;
}
