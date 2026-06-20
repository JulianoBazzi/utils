import { onlyNumbers } from '../formatting/onlyNumbers.js';

// All characters identical (e.g. "11111111").
const isRepeated = (value: string): boolean => /^(\d)\1*$/.test(value);

/**
 * Validate a Brazilian phone number (landline or mobile). Strips non-digits
 * first, then checks length and the DDD / leading-digit rules.
 *
 * @example
 * isValidPhone("(11) 98765-4321") // true
 * isValidPhone("11111111") // false
 */
export function isValidPhone(value?: string | null): boolean {
  const phone = onlyNumbers(value);

  if (isRepeated(phone)) {
    return false;
  }

  if (phone.length < 8 || phone.length > 11) {
    return false;
  }

  // DDD não pode começar com 0.
  if (phone.length > 9 && [0, 1].includes(phone.indexOf('0'))) {
    return false;
  }

  const shortNumber = phone.length > 9 ? phone.substring(2) : phone;

  // Telefone fixo (8 dígitos): primeiro dígito entre 2 e 8.
  if (shortNumber.length === 8) {
    return [2, 3, 4, 5, 6, 7, 8].includes(Number(shortNumber[0]));
  }

  // Celular (9 dígitos): inicia com 9.
  return shortNumber[0] === '9';
}
