import { onlyNumbers } from '../formatting/onlyNumbers.js';
import { checkDigit } from './internal/checkDigit.js';

/**
 * Validate a Brazilian CPF (with or without mask) via its two check digits.
 *
 * @example
 * isValidCPF("529.982.247-25") // true
 * isValidCPF("11111111111") // false
 */
export function isValidCPF(value?: string | null): boolean {
  const cpf = onlyNumbers(value);

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  const dv1 = checkDigit(cpf, [10, 9, 8, 7, 6, 5, 4, 3, 2]);
  const dv2 = checkDigit(cpf, [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]);

  return dv1 === Number(cpf[9]) && dv2 === Number(cpf[10]);
}
