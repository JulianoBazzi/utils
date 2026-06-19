import { onlyNumbers } from './onlyNumbers.js';

/**
 * Mask a Brazilian phone number. Strips non-digits first, then handles both
 * 10-digit (landline) and 11-digit (mobile) numbers. Empty input → `""`.
 *
 * @example
 * formatPhone("1112345678") // "(11) 1234-5678"
 * formatPhone("11912345678") // "(11) 91234-5678"
 */
export function formatPhone(phone?: string | null): string {
  const digits = onlyNumbers(phone);
  if (!digits) {
    return '';
  }

  if (digits.length > 10) {
    return digits.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
  }

  return digits.replace(/^(\d{2})(\d{4})(\d{4}).*/, '($1) $2-$3');
}
