import { findOptionById } from './findOptionById.js';

type IdLike = { id?: string | number | null };

export interface GetLabelByIdOptions<O> {
  /** Field returned from the matched option. Defaults to `"name"`. */
  key?: keyof O;
  /** Returned when no option matches or the field is empty. Defaults to `""`. */
  fallback?: string;
}

/**
 * Find an option by id and return one of its fields as a string (default `name`),
 * or `fallback` when not found or the field is empty.
 *
 * @example
 * getLabelById([{ id: 1, name: "A" }], "1") // "A"
 * getLabelById([{ id: 1, name: "A" }], "9", { fallback: "—" }) // "—"
 * getLabelById([{ id: 1, code: "X" }], "1", { key: "code" }) // "X"
 */
export function getLabelById<O extends IdLike>(
  options: O[] | undefined | null,
  value?: string | string[] | null,
  config?: GetLabelByIdOptions<O>,
): string;
/** Positional form `(options, value, key, fallback)`, kept for compatibility (legacy, removed in 2.0). */
export function getLabelById<O extends IdLike>(
  options: O[] | undefined | null,
  value?: string | string[] | null,
  key?: keyof O,
  fallback?: string,
): string;
export function getLabelById<O extends IdLike>(
  options: O[] | undefined | null,
  value?: string | string[] | null,
  keyOrConfig?: keyof O | GetLabelByIdOptions<O>,
  positionalFallback = '',
): string {
  const { key = 'name' as keyof O, fallback = positionalFallback } =
    typeof keyOrConfig === 'object' && keyOrConfig !== null ? keyOrConfig : { key: keyOrConfig };

  const option = findOptionById(options, value);
  const label = option?.[key];

  return label == null ? fallback : String(label);
}
