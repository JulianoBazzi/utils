import { formatCPF } from '../formatting/formatCPF.js';
import { checkDigit } from '../validation/internal/checkDigit.js';
import { isRepeated } from '../validation/internal/digits.js';
import { randomDigits } from './internal/randomDigits.js';

export interface GenerateCPFOptions {
  /** Return the CPF masked as `000.000.000-00`. Defaults to `false`. */
  formatted?: boolean;
}

/**
 * Generate a random, valid CPF — handy for tests and database seeds.
 *
 * @example
 * generateCPF() // e.g. "52998224725"
 * generateCPF({ formatted: true }) // e.g. "529.982.247-25"
 */
export function generateCPF(options: GenerateCPFOptions = {}): string {
  const { formatted = false } = options;

  let base: string;
  do {
    base = randomDigits(9);
  } while (isRepeated(base));

  const dv1 = checkDigit(base, [10, 9, 8, 7, 6, 5, 4, 3, 2]);
  const dv2 = checkDigit(`${base}${dv1}`, [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]);
  const cpf = `${base}${dv1}${dv2}`;

  return formatted ? formatCPF(cpf) : cpf;
}
