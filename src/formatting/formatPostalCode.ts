import { onlyNumbers } from './onlyNumbers.js';

export interface FormatPostalCodeOptions {
  /** Returned when the input is empty/missing. Defaults to `""`. */
  fallback?: string;
  /**
   * Left-pad short input with zeros before masking. Defaults to `true`; with
   * `false`, input that is not exactly 8 digits long comes back as plain
   * digits instead of looking like a valid document. The default becomes
   * `false` in 2.0.
   */
  pad?: boolean;
}

/**
 * Format a Brazilian postal code (CEP) as `00000-000`. Pads with leading
 * zeros by default (pass `pad: false` to leave incomplete input unmasked);
 * values with more than 8 digits are returned as plain digits. Returns
 * `fallback` for missing input.
 *
 * @example
 * formatPostalCode("01310100") // "01310-100"
 * formatPostalCode("1310100", { pad: false }) // "1310100"
 * formatPostalCode("", { fallback: "Não Informado" }) // "Não Informado"
 */
export function formatPostalCode(
  value?: string | null,
  options: FormatPostalCodeOptions = {},
): string {
  const { fallback = '', pad = true } = options;
  const cep = onlyNumbers(value);
  if (!cep) return fallback;
  if (!pad && cep.length !== 8) return cep;

  return cep.padStart(8, '0').replace(/^(\d{5})(\d{3})$/, '$1-$2');
}
