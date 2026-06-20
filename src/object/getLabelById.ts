import { findOptionById } from './findOptionById.js';

/**
 * Find an option by id and return one of its fields as a string (default `name`),
 * or `fallback` when not found or the field is empty.
 *
 * @example
 * getLabelById([{ id: 1, name: "A" }], "1") // "A"
 * getLabelById([{ id: 1, name: "A" }], "9", "name", "—") // "—"
 */
export function getLabelById<O extends { id?: string | number | null }>(
  options: O[] | undefined | null,
  value?: string | string[] | null,
  key: keyof O = 'name' as keyof O,
  fallback = '',
): string {
  const option = findOptionById(options, value);
  const label = option?.[key];

  return label == null ? fallback : String(label);
}
