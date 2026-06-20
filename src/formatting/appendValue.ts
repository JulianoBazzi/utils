import { applyCasing, type LetterCasing } from './applyCasing.js';

interface AppendValueOptions {
  /** Joins the two values when both are present. Defaults to `"; "`. */
  separator?: string;
  /** Returned when both values are empty/missing. Defaults to `""`. */
  fallback?: string;
  /** Letter casing of the output. Defaults to no transformation. */
  casing?: LetterCasing;
}

/**
 * Append `value` to `base`, keeping whichever is present. Each side is trimmed
 * first (whitespace-only counts as empty); when both remain they are joined by
 * `separator`. Useful for appending a new note to an existing one.
 *
 * @example
 * appendValue("a", "b") // "a; b"
 * appendValue("a") // "a"
 * appendValue(undefined, "b") // "b"
 * appendValue("a", "b", { separator: " | " }) // "a | b"
 * appendValue("", "", { fallback: "Não Informado" }) // "Não Informado"
 * appendValue("a", "b", { casing: "uppercase" }) // "A; B"
 */
export function appendValue(
  base?: string | null,
  value?: string | null,
  options: AppendValueOptions = {},
): string {
  const { separator = '; ', fallback = '', casing } = options;
  const trimmedBase = base?.trim();
  const trimmedValue = value?.trim();
  if (!trimmedBase && !trimmedValue) return fallback;

  let result: string;
  if (!trimmedBase) {
    result = trimmedValue ?? '';
  } else if (!trimmedValue) {
    result = trimmedBase;
  } else {
    result = `${trimmedBase}${separator}${trimmedValue}`;
  }
  return applyCasing(result?.trim(), casing);
}
