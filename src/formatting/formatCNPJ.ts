import { onlyAlphanumeric } from './onlyAlphanumeric.js';

interface FormatCNPJOptions {
  /** Returned when the input is empty/missing. Defaults to `""`. */
  fallback?: string;
}

/**
 * Format a CNPJ as `00.000.000/0000-00` (legacy) or `12.ABC.345/01DE-35`
 * (new alphanumeric). Pads with leading zeros. Empty input → `""`.
 *
 * @example
 * formatCNPJ("11222333000181") // "11.222.333/0001-81"
 * formatCNPJ("12ABC34501DE35") // "12.ABC.345/01DE-35"
 * formatCNPJ("", { fallback: "Não Informado" }) // "Não Informado"
 */
export function formatCNPJ(value?: string | null, options: FormatCNPJOptions = {}): string {
  const { fallback = '' } = options;
  const cnpj = onlyAlphanumeric(value);
  if (!cnpj) return fallback;

  return cnpj
    .padStart(14, '0')
    .replace(/^([0-9A-Z]{2})([0-9A-Z]{3})([0-9A-Z]{3})([0-9A-Z]{4})(\d{2})$/, '$1.$2.$3/$4-$5');
}
