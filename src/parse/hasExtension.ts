import { getFileExtension } from './getFileExtension.js';

/**
 * Whether a file name or URL ends with one of `extensions` (case-insensitive,
 * with or without the dot; `?query`/`#hash` ignored — signed URLs work).
 *
 * @example
 * hasExtension("report.PDF", ["pdf"]) // true
 * hasExtension("https://cdn/a.png?sig=1", [".png", ".jpg"]) // true
 * hasExtension("notes", ["txt"]) // false
 */
export function hasExtension(
  fileName: string | null | undefined,
  extensions: readonly string[],
): boolean {
  const extension = getFileExtension(fileName).toLowerCase();
  return (
    extension !== '' &&
    extensions.some((candidate) => candidate.replace(/^\./, '').toLowerCase() === extension)
  );
}
