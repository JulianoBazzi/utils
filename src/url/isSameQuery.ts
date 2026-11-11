import { toSearchParams } from './internal/toSearchParams.js';
import type { QuerySource } from './types.js';

export interface IsSameQueryOptions {
  /** Also ignore the order of repeated values (`id=1&id=2` = `id=2&id=1`). Defaults to `false`. */
  ignoreValueOrder?: boolean;
}

const compare = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);

/**
 * Compare two query sources by content, not by string: key order and
 * encoding differences (`+` vs `%20`, leading `?`) don't matter, and object
 * sources ignore `undefined` values. The order of repeated values matters
 * unless `ignoreValueOrder` is set. Use it to skip navigating to the URL you
 * are already on.
 *
 * @example
 * isSameQuery("a=1&b=2", "b=2&a=1") // true
 * isSameQuery("q=a+b", "?q=a%20b") // true
 * isSameQuery("id=1&id=2", "id=2&id=1") // false
 * isSameQuery("id=1&id=2", "id=2&id=1", { ignoreValueOrder: true }) // true
 */
export function isSameQuery(
  a: QuerySource,
  b: QuerySource,
  options: IsSameQueryOptions = {},
): boolean {
  const entries = (source: QuerySource) => {
    const list = [...toSearchParams(source)];
    // Array#sort is stable: sorting by key alone keeps repeated values in order.
    return list.sort(
      (x, y) => compare(x[0], y[0]) || (options.ignoreValueOrder ? compare(x[1], y[1]) : 0),
    );
  };

  const left = entries(a);
  const right = entries(b);
  return (
    left.length === right.length &&
    left.every(([key, value], index) => right[index]?.[0] === key && right[index]?.[1] === value)
  );
}
