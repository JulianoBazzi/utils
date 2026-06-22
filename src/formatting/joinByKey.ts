import { getProperty } from '../object/getProperty.js';

export interface JoinByKeyOptions {
  /** Divider placed between values. Defaults to `" | "`. */
  divider?: string;
  /** Sort entries by `key` before joining. `true` = ascending. Defaults to no sorting. */
  sort?: boolean | 'asc' | 'desc';
}

/**
 * Join a single property of each object in an array into a string.
 * Skips falsy entries. Returns an empty string for an empty/missing array.
 *
 * Pass `sort` to order entries by `key` before joining (immutable: the input
 * array is not mutated). Numbers compare numerically, otherwise localeCompare (pt-BR).
 *
 * @example
 * joinByKey([{ name: "a" }, { name: "b" }], "name") // "a | b"
 * joinByKey([{ id: 1 }, { id: 2 }], "id", ", ") // "1, 2"
 * joinByKey([{ name: "b" }, { name: "a" }], "name", { sort: true }) // "a | b"
 * joinByKey([{ id: 1 }, { id: 2 }], "id", { sort: "desc", divider: ", " }) // "2, 1"
 */
export function joinByKey<T, K extends keyof T>(
  values: T[],
  key: K,
  dividerOrOptions: string | JoinByKeyOptions = ' | ',
): string {
  if (!values?.length) return '';

  const { divider = ' | ', sort = false } =
    typeof dividerOrOptions === 'string' ? { divider: dividerOrOptions } : dividerOrOptions;

  let entries = values.filter((value): value is T => Boolean(value));

  if (sort) {
    const direction = sort === 'desc' ? -1 : 1;
    entries = [...entries].sort((a, b) => {
      const left = getProperty(a, key);
      const right = getProperty(b, key);
      if (left == null) return right == null ? 0 : -1 * direction;
      if (right == null) return 1 * direction;
      if (typeof left === 'number' && typeof right === 'number') return (left - right) * direction;
      return String(left).localeCompare(String(right), 'pt-BR') * direction;
    });
  }

  return entries.map((value) => String(getProperty(value, key))).join(divider);
}
