import { onlyNumbers } from './onlyNumbers.js';

/**
 * Format a CPF as `000.000.000-00`. Pads with leading zeros.
 * Returns an empty string for missing input.
 *
 * @example
 * formatCPF("52998224725") // "529.982.247-25"
 */
export function formatCPF(value?: string): string {
  const cpf = onlyNumbers(value);
  if (!cpf) return '';

  return cpf.padStart(11, '0').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}
