interface FormatCityAndStateOptions {
  /** Returned when both city and state are empty/missing. Defaults to `""`. */
  fallback?: string;
  /** Joins city and state when both are present. Defaults to `" - "`. */
  separator?: string;
}

/**
 * Join a city and state as `"City - State"`. When only one is present it is
 * returned without a trailing separator.
 *
 * @example
 * formatCityAndState("São Paulo", "SP") // "São Paulo - SP"
 * formatCityAndState("São Paulo") // "São Paulo"
 * formatCityAndState("São Paulo", "SP", { separator: "/" }) // "São Paulo/SP"
 * formatCityAndState("", "", { fallback: "Não Informado" }) // "Não Informado"
 */
export function formatCityAndState(
  city?: string,
  state?: string,
  options: FormatCityAndStateOptions = {},
): string {
  const { fallback = '', separator = ' - ' } = options;
  if (!city && !state) return fallback;

  return [city, state].filter(Boolean).join(separator);
}
