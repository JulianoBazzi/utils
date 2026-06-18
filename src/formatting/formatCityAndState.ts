/**
 * Join a city and state as `"City - State"`. When only one is present it is
 * returned without a trailing dash. Returns `"Não Informado"` when both are empty.
 *
 * @example
 * formatCityAndState("São Paulo", "SP") // "São Paulo - SP"
 * formatCityAndState("São Paulo") // "São Paulo"
 */
export function formatCityAndState(city?: string, state?: string): string {
  if (!city && !state) {
    return "Não Informado";
  }

  return [city, state].filter(Boolean).join(" - ");
}
