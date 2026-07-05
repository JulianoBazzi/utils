import { removeAccents } from './removeAccents.js';

/**
 * Convert text into a URL-safe slug: removes accents, lowercases, replaces runs
 * of non-alphanumerics with `-`, and trims leading/trailing hyphens. Empty
 * input → `""`.
 *
 * @example
 * slugify("São Paulo") // "sao-paulo"
 * slugify("Relatório 2026!") // "relatorio-2026"
 */
export function slugify(value?: string | null): string {
  if (!value) {
    return '';
  }

  return removeAccents(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
