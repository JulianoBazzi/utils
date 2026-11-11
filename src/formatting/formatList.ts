export interface FormatListOptions {
  /** Show at most this many items, then `"e mais N"`. Defaults to all. */
  limit?: number;
  /** Word before the last item. Defaults to `"e"`. */
  conjunction?: string;
  /** Text for the hidden items. Defaults to `` (n) => `mais ${n}` ``. */
  moreLabel?: (hidden: number) => string;
  /** Returned for an empty list. Defaults to `""`. */
  fallback?: string;
}

/**
 * Join items as a Portuguese list: `"a, b e c"`. Empty and missing items are
 * skipped. With `limit`, the rest is summarized: `"a, b, c e mais 2"`.
 *
 * @example
 * formatList(["Ana", "Bia", "Caio"]) // "Ana, Bia e Caio"
 * formatList(["Ana", "Bia"], { conjunction: "ou" }) // "Ana ou Bia"
 * formatList(["a", "b", "c", "d", "e"], { limit: 3 }) // "a, b, c e mais 2"
 * formatList([], { fallback: "Nenhum" }) // "Nenhum"
 */
export function formatList(
  items?: readonly (string | null | undefined)[] | null,
  options: FormatListOptions = {},
): string {
  const {
    limit,
    conjunction = 'e',
    moreLabel = (hidden: number) => `mais ${hidden}`,
    fallback = '',
  } = options;

  const values = (items ?? []).map((item) => item?.trim()).filter((item): item is string => !!item);
  if (!values.length) {
    return fallback;
  }

  const hidden = limit !== undefined && limit > 0 ? Math.max(values.length - limit, 0) : 0;
  const parts = hidden ? [...values.slice(0, limit), moreLabel(hidden)] : values;
  if (parts.length === 1) {
    return parts[0] as string;
  }

  return `${parts.slice(0, -1).join(', ')} ${conjunction} ${parts.at(-1)}`;
}
