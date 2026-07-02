import { onlyAlphanumeric } from './onlyAlphanumeric.js';

interface FormatPlateOptions {
  /** Returned when the input is empty/missing. Defaults to `""`. */
  fallback?: string;
}

/**
 * Format a Brazilian license plate. Legacy plates render as `AAA-1234`;
 * Mercosul plates keep the official layout without separator (`ABC1D23`).
 * Values that don't match the legacy layout are returned cleaned and
 * uppercased.
 *
 * @example
 * formatPlate("abc1234") // "ABC-1234"
 * formatPlate("abc1d23") // "ABC1D23"
 * formatPlate("", { fallback: "Não Informado" }) // "Não Informado"
 */
export function formatPlate(value?: string | null, options: FormatPlateOptions = {}): string {
  const { fallback = '' } = options;
  const plate = onlyAlphanumeric(value);
  if (!plate) return fallback;

  if (/^[A-Z]{3}\d{4}$/.test(plate)) {
    return `${plate.slice(0, 3)}-${plate.slice(3)}`;
  }

  return plate;
}
