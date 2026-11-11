import { getProperty } from '../object/getProperty.js';
import { resolveOptions } from './internal/resolveOptions.js';

export interface JoinByKeyOptions {
  /** Divider placed between values. Defaults to `" | "`. */
  divider?: string;
  /** Sort entries by `key` before joining. `true` = ascending. Defaults to no sorting. */
  sort?: boolean | 'asc' | 'desc';
  /** Drop duplicate values, keeping the first occurrence. Defaults to `false`. */
  unique?: boolean;
}

/**
 * Join a single property of each object in an array into a string.
 * Skips falsy entries and empty values. Returns an empty string for an
 * empty/missing array.
 *
 * Pass `sort` to order entries by `key` before joining (immutable: the input
 * array is not mutated). Numbers compare numerically, otherwise localeCompare (pt-BR).
 * Pass `unique` to collapse repeated values.
 *
 * @example
 * joinByKey([{ name: "a" }, { name: "b" }], "name") // "a | b"
 * joinByKey([{ id: 1 }, { id: 2 }], "id", ", ") // "1, 2"
 * joinByKey([{ name: "b" }, { name: "a" }], "name", { sort: true }) // "a | b"
 * joinByKey([{ id: 1 }, { id: 2 }], "id", { sort: "desc", divider: ", " }) // "2, 1"
 * joinByKey([{ name: "a" }, { name: "a" }], "name", { unique: true }) // "a"
 */
export function joinByKey<T, K extends keyof T>(
  values: readonly T[] | null | undefined,
  key: K,
  dividerOrOptions: string | JoinByKeyOptions = ' | ',
): string {
  if (!values?.length) return '';

  const {
    divider = ' | ',
    sort = false,
    unique = false,
  } = resolveOptions<JoinByKeyOptions, 'divider'>(dividerOrOptions, 'divider');

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

  let labels = entries
    .map((value) => getProperty(value, key))
    .filter((value) => value != null && String(value) !== '')
    .map(String);

  if (unique) {
    labels = [...new Set(labels)];
  }

  return labels.join(divider);
}
