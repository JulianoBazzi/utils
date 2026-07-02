import { formatPhone } from '../formatting/formatPhone.js';
import { getRandomInt } from '../number/getRandomInt.js';

interface GeneratePhoneOptions {
  /** Generate a mobile number (11 digits). Defaults to `true`; `false` → landline (10 digits). */
  mobile?: boolean;
  /** Return the phone masked, e.g. `(11) 98765-4321`. Defaults to `false`. */
  formatted?: boolean;
}

const digits = (count: number) => Array.from({ length: count }, () => getRandomInt(0, 9)).join('');

/**
 * Generate a random, valid Brazilian phone number — handy for tests and
 * seeds. Mobile numbers start with `9`; landlines with a digit from 2 to 8.
 *
 * @example
 * generatePhone() // e.g. "11987654321"
 * generatePhone({ mobile: false, formatted: true }) // e.g. "(11) 3456-7890"
 */
export function generatePhone(options: GeneratePhoneOptions = {}): string {
  const { mobile = true, formatted = false } = options;

  let phone: string;
  do {
    // DDD digits can't be zero (isValidPhone rule).
    const ddd = `${getRandomInt(1, 9)}${getRandomInt(1, 9)}`;
    phone = mobile ? `${ddd}9${digits(8)}` : `${ddd}${getRandomInt(2, 8)}${digits(7)}`;
  } while (/^(\d)\1*$/.test(phone));

  return formatted ? formatPhone(phone) : phone;
}
