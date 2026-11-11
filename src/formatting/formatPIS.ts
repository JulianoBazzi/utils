import { onlyNumbers } from './onlyNumbers.js';

export interface FormatPISOptions {
  /** Returned when the input is empty/missing. Defaults to `""`. */
  fallback?: string;
  /**
   * Left-pad short input with zeros before masking. Defaults to `true`; with
   * `false`, input that is not exactly 11 digits long comes back as plain
   * digits instead of looking like a valid document. The default becomes
   * `false` in 2.0.
   */
  pad?: boolean;
}

/**
 * Format a PIS/PASEP number as `000.00000.00-0`. Pads with leading zeros by
 * default (pass `pad: false` to leave incomplete input unmasked); values with
 * more than 11 digits are returned as plain digits. Returns `fallback` for
 * missing input.
 *
 * @example
 * formatPIS("12012345672") // "120.12345.67-2"
 * formatPIS("", { fallback: "Não Informado" }) // "Não Informado"
 */
export function formatPIS(value?: string | null, options: FormatPISOptions = {}): string {
  const { fallback = '', pad = true } = options;
  const pis = onlyNumbers(value);
  if (!pis) return fallback;
  if (!pad && pis.length !== 11) return pis;

  return pis.padStart(11, '0').replace(/^(\d{3})(\d{5})(\d{2})(\d)$/, '$1.$2.$3-$4');
}
