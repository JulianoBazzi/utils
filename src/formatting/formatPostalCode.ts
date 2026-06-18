import { onlyNumbers } from "./onlyNumbers.js";

/**
 * Format a Brazilian postal code (CEP) as `00000-000`. Pads with leading zeros.
 * Returns an empty string for missing input.
 *
 * @example
 * formatPostalCode("01310100") // "01310-100"
 */
export function formatPostalCode(value?: string): string {
  const cep = onlyNumbers(value);
  if (!cep) return "";

  return cep.padStart(8, "0").replace(/(\d{5})(\d{3})/, "$1-$2");
}
