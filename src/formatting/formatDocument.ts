import { formatCNPJ } from './formatCNPJ.js';
import { formatCPF } from './formatCPF.js';
import { onlyAlphanumeric } from './onlyAlphanumeric.js';

interface FormatDocumentOptions {
  /** Returned when the input is empty/missing. Defaults to `""`. */
  fallback?: string;
}

/**
 * Format a value as a CPF (≤ 11 chars) or a CNPJ (otherwise).
 *
 * @example
 * formatDocument("52998224725") // "529.982.247-25"
 * formatDocument("11222333000181") // "11.222.333/0001-81"
 * formatDocument("12ABC34501DE35") // "12.ABC.345/01DE-35"
 * formatDocument("", { fallback: "Não Informado" }) // "Não Informado"
 */
export function formatDocument(value?: string, options: FormatDocumentOptions = {}): string {
  return onlyAlphanumeric(value).length > 11
    ? formatCNPJ(value, options)
    : formatCPF(value, options);
}
