import { onlyNumbers } from './onlyNumbers.js';

interface FormatPISOptions {
  /** Returned when the input is empty/missing. Defaults to `""`. */
  fallback?: string;
}

/**
 * Format a PIS/PASEP number as `000.00000.00-0`. Pads with leading zeros.
 * Returns an empty string for missing input.
 *
 * @example
 * formatPIS("12012345672") // "120.12345.67-2"
 * formatPIS("", { fallback: "Não Informado" }) // "Não Informado"
 */
export function formatPIS(value?: string | null, options: FormatPISOptions = {}): string {
  const { fallback = '' } = options;
  const pis = onlyNumbers(value);
  if (!pis) return fallback;

  return pis.padStart(11, '0').replace(/(\d{3})(\d{5})(\d{2})(\d)/, '$1.$2.$3-$4');
}
