import { onlyNumbers } from './onlyNumbers.js';

interface FormatCPFOptions {
  /** Returned when the input is empty/missing. Defaults to `""`. */
  fallback?: string;
}

/**
 * Format a CPF as `000.000.000-00`. Pads with leading zeros.
 * Returns an empty string for missing input.
 *
 * @example
 * formatCPF("52998224725") // "529.982.247-25"
 * formatCPF("", { fallback: "Não Informado" }) // "Não Informado"
 */
export function formatCPF(value?: string, options: FormatCPFOptions = {}): string {
  const { fallback = '' } = options;
  const cpf = onlyNumbers(value);
  if (!cpf) return fallback;

  return cpf.padStart(11, '0').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}
