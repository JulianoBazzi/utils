import { applyCasing, type LetterCasing } from './applyCasing.js';

export interface FormatCityAndStateOptions {
  /** Returned when both city and state are empty/missing. Defaults to `""`. */
  fallback?: string;
  /** Joins city and state when both are present. Defaults to `" - "`. */
  separator?: string;
  /** Letter casing of the output. Defaults to no transformation. */
  casing?: LetterCasing;
}

/**
 * Join a city and state as `"City - State"`. Each part is trimmed; when only
 * one is present it is returned without a dangling separator.
 *
 * @example
 * formatCityAndState("São Paulo", "SP") // "São Paulo - SP"
 * formatCityAndState("São Paulo") // "São Paulo"
 * formatCityAndState(" ", "SP") // "SP"
 * formatCityAndState("São Paulo", "SP", { separator: "/" }) // "São Paulo/SP"
 * formatCityAndState("", "", { fallback: "Não Informado" }) // "Não Informado"
 */
export function formatCityAndState(
  city?: string | null,
  state?: string | null,
  options: FormatCityAndStateOptions = {},
): string {
  const { fallback = '', separator = ' - ', casing } = options;
  const parts = [city?.trim(), state?.trim()].filter(Boolean);
  if (!parts.length) return fallback;

  return applyCasing(parts.join(separator), casing);
}
