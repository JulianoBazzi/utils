import { normalizeText } from '../formatting/normalizeText.js';

export interface IsSameTextOptions {
  /** Ignore accents (`"é"` = `"e"`). Defaults to `true`. */
  ignoreAccents?: boolean;
  /** Ignore letter case. Defaults to `true`. */
  ignoreCase?: boolean;
  /** Treat any run of whitespace as one space. Defaults to `true`. */
  collapseWhitespace?: boolean;
}

/**
 * Compare two texts loosely — the check behind "type the name to confirm"
 * dialogs. Both sides are trimmed; accents, case and repeated spaces are
 * ignored by default. An empty side never matches.
 *
 * @example
 * isSameText("  Excluir   Usuário ", "excluir usuario") // true
 * isSameText("Excluir", "excluir", { ignoreCase: false }) // false
 * isSameText("", "") // false
 */
export function isSameText(
  a?: string | null,
  b?: string | null,
  options: IsSameTextOptions = {},
): boolean {
  const { ignoreAccents = true, ignoreCase = true, collapseWhitespace = true } = options;
  const normalize = (value?: string | null) =>
    normalizeText(value, {
      casing: ignoreCase ? 'lowercase' : 'none',
      collapseWhitespace,
      removeAccents: ignoreAccents,
    });

  const left = normalize(a);
  return left !== '' && left === normalize(b);
}
