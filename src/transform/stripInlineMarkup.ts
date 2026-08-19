import { type ParseInlineMarkupOptions, parseInlineMarkup } from '../parse/parseInlineMarkup.js';

/**
 * Strip inline markup (`*bold*`, `_italic_`) down to plain text, so the same
 * source can feed a `<title>`, a tooltip, an e-mail or `truncate` without
 * rendering segments first. Text without markup comes back unchanged, and
 * literal markers are preserved exactly as `parseInlineMarkup` reads them.
 * Empty/missing input yields `""`.
 *
 * @example
 * stripInlineMarkup("Olha o *aviso* aqui") // "Olha o aviso aqui"
 * stripInlineMarkup("2 * 3 = 6") // "2 * 3 = 6"
 */
export function stripInlineMarkup(
  value?: string | null,
  options: ParseInlineMarkupOptions = {},
): string {
  return parseInlineMarkup(value, options)
    .map((segment) => segment.text)
    .join('');
}
