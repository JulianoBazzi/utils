import { onlyNumbers } from './onlyNumbers.js';

interface FormatPostalCodeOptions {
  /** Returned when the input is empty/missing. Defaults to `""`. */
  fallback?: string;
}

/**
 * Format a Brazilian postal code (CEP) as `00000-000`. Pads with leading zeros.
 * Returns an empty string for missing input.
 *
 * @example
 * formatPostalCode("01310100") // "01310-100"
 * formatPostalCode("", { fallback: "Não Informado" }) // "Não Informado"
 */
export function formatPostalCode(value?: string, options: FormatPostalCodeOptions = {}): string {
  const { fallback = '' } = options;
  const cep = onlyNumbers(value);
  if (!cep) return fallback;

  return cep.padStart(8, '0').replace(/(\d{5})(\d{3})/, '$1-$2');
}
