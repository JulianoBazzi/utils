import { onlyAlphanumeric } from './onlyAlphanumeric.js';

export interface FormatCNPJOptions {
  /** Returned when the input is empty/missing. Defaults to `""`. */
  fallback?: string;
  /**
   * Left-pad short input with zeros before masking. Defaults to `true`; with
   * `false`, input that is not exactly 14 characters long comes back as plain
   * characters instead of looking like a valid document. The default becomes
   * `false` in 2.0.
   */
  pad?: boolean;
}

/**
 * Format a CNPJ as `00.000.000/0000-00` (legacy) or `12.ABC.345/01DE-35`
 * (new alphanumeric). Pads with leading zeros by default (pass `pad: false`
 * to leave incomplete input unmasked). Empty input → `fallback`.
 *
 * @example
 * formatCNPJ("11222333000181") // "11.222.333/0001-81"
 * formatCNPJ("12ABC34501DE35") // "12.ABC.345/01DE-35"
 * formatCNPJ("1234567800019", { pad: false }) // "1234567800019"
 * formatCNPJ("", { fallback: "Não Informado" }) // "Não Informado"
 */
export function formatCNPJ(value?: string | null, options: FormatCNPJOptions = {}): string {
  const { fallback = '', pad = true } = options;
  const cnpj = onlyAlphanumeric(value);
  if (!cnpj) return fallback;
  if (!pad && cnpj.length !== 14) return cnpj;

  return cnpj
    .padStart(14, '0')
    .replace(/^([0-9A-Z]{2})([0-9A-Z]{3})([0-9A-Z]{3})([0-9A-Z]{4})(\d{2})$/, '$1.$2.$3/$4-$5');
}
