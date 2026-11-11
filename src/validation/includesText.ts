import { normalizeText } from '../formatting/normalizeText.js';

/**
 * Accent- and case-insensitive "contains", for search boxes: `"sao"` finds
 * `"São Paulo"`. Whitespace is collapsed on both sides. An empty search
 * matches everything; a missing text matches only an empty search.
 *
 * @example
 * includesText("São Paulo", "sao") // true
 * includesText("São Paulo", "  PAULO ") // true
 * includesText("São Paulo", "") // true
 * includesText(null, "a") // false
 */
export function includesText(text?: string | null, search?: string | null): boolean {
  const needle = normalizeText(search);
  return !needle || normalizeText(text).includes(needle);
}
