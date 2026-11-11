import { removeAccents as stripAccents } from './removeAccents.js';

export interface NormalizeTextOptions {
  /** Casing of the result. Defaults to `"lowercase"`; `"none"` keeps it. */
  casing?: 'lowercase' | 'uppercase' | 'none';
  /** Collapse runs of whitespace into one space. Defaults to `true`. */
  collapseWhitespace?: boolean;
  /** Trim both ends. Defaults to `true`. */
  trim?: boolean;
  /** Remove accents. Defaults to `true`. */
  removeAccents?: boolean;
}

/**
 * Normalize text for comparison and search: removes accents, lowercases,
 * collapses whitespace and trims (each step configurable). Missing input →
 * `""`.
 *
 * @example
 * normalizeText("  São   Paulo ") // "sao paulo"
 * normalizeText("Perecíveis", { casing: "uppercase" }) // "PERECIVEIS"
 */
export function normalizeText(value?: string | null, options: NormalizeTextOptions = {}): string {
  const {
    casing = 'lowercase',
    collapseWhitespace = true,
    trim = true,
    removeAccents = true,
  } = options;

  let text = removeAccents ? stripAccents(value) : (value ?? '');
  if (casing === 'lowercase') text = text.toLowerCase();
  if (casing === 'uppercase') text = text.toUpperCase();
  if (collapseWhitespace) text = text.replace(/\s+/g, ' ');
  return trim ? text.trim() : text;
}
