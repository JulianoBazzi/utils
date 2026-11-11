import { normalizePhone } from './internal/normalizePhone.js';

export interface FormatPhoneOptions {
  /** Returned when the input is empty/missing. Defaults to `""`. */
  fallback?: string;
}

/**
 * Mask a Brazilian phone number. Strips non-digits, a leading `55` country
 * code and a trunk `0`, then masks 10-digit (landline) and 11-digit (mobile)
 * numbers. Non-geographic numbers (`0800`, `0300`…) are grouped as
 * `"0800 123 4567"`. Empty input → `fallback`.
 *
 * @example
 * formatPhone("1112345678") // "(11) 1234-5678"
 * formatPhone("11912345678") // "(11) 91234-5678"
 * formatPhone("+55 11 98765-4321") // "(11) 98765-4321"
 * formatPhone("0800 123 4567") // "0800 123 4567"
 * formatPhone(null, { fallback: "Não Informado" }) // "Não Informado"
 */
export function formatPhone(phone?: string | null, options: FormatPhoneOptions = {}): string {
  const { fallback = '' } = options;
  const { digits, nonGeographic } = normalizePhone(phone);
  if (!digits) {
    return fallback;
  }

  if (nonGeographic) {
    return `${digits.slice(0, 4)} ${digits.slice(4, -4)} ${digits.slice(-4)}`;
  }

  if (digits.length > 10) {
    return digits.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
  }

  return digits.replace(/^(\d{2})(\d{4})(\d{4}).*/, '($1) $2-$3');
}
