import { removeAccents as stripAccents } from './removeAccents.js';

export interface SanitizeFileNameOptions {
  /** Maximum length in characters (code points). Defaults to `255`. */
  maxLength?: number;
  /** Returned when nothing usable is left. Defaults to `""`. */
  fallback?: string;
  /** Remove accents too (`"Relatório"` → `"Relatorio"`). Defaults to `false`. */
  removeAccents?: boolean;
  /** Replaces each run of forbidden characters. Defaults to `"-"`. */
  replacement?: string;
}

const FORBIDDEN = new Set(['\\', '/', ':', '*', '?', '"', '<', '>', '|']);
const RESERVED = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(\..*)?$/i;

const isForbidden = (char: string) => {
  const code = char.charCodeAt(0);
  return FORBIDDEN.has(char) || code < 0x20 || code === 0x7f;
};

/**
 * Turn any text into a file name that is safe on Windows, macOS and Linux:
 * replaces `\ / : * ? " < > |` and control characters, collapses whitespace,
 * drops trailing dots and spaces, prefixes Windows reserved names (`CON`,
 * `NUL`, `COM1`…) with `_`, and cuts to `maxLength` without splitting an
 * emoji.
 *
 * @example
 * sanitizeFileName("Relatório: 01/02") // "Relatório- 01-02"
 * sanitizeFileName("Relatório: 01/02", { removeAccents: true, replacement: "_" }) // "Relatorio_ 01_02"
 * sanitizeFileName("con.txt") // "_con.txt"
 * sanitizeFileName("...", { fallback: "Sem Nome" }) // "Sem Nome"
 */
export function sanitizeFileName(
  value?: string | null,
  options: SanitizeFileNameOptions = {},
): string {
  const { maxLength = 255, fallback = '', removeAccents = false, replacement = '-' } = options;

  const source = removeAccents ? stripAccents(value) : (value ?? '');
  let name = '';
  let replacing = false;
  for (const char of source) {
    if (isForbidden(char)) {
      if (!replacing) name += replacement;
      replacing = true;
    } else {
      name += char;
      replacing = false;
    }
  }

  name = name.replace(/\s+/g, ' ').trim();
  name = [...name]
    .slice(0, Math.max(maxLength, 0))
    .join('')
    .replace(/[.\s]+$/, '');
  if (RESERVED.test(name)) {
    name = `_${name}`;
  }

  return name || fallback;
}
