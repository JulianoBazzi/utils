import { onlyNumbers } from '../onlyNumbers.js';

export interface NormalizedPhone {
  /** National digits: DDD + number, or the full non-geographic number (`08001234567`). */
  digits: string;
  /** `0800`/`0300`/`0500`/`0900` numbers have no DDD and no country code. */
  nonGeographic: boolean;
}

const NON_GEOGRAPHIC = /^0[3589]00\d{6,7}$/;

/**
 * Reduce a Brazilian phone number to its national digits: strips formatting,
 * a leading country code (for `55`, only when 10–11 digits are left after it)
 * and a leading trunk `0` (`"011 98765-4321"`).
 *
 * @internal
 */
export function normalizePhone(
  value?: string | null,
  countryCode: string | null = '55',
): NormalizedPhone {
  let digits = onlyNumbers(value);

  if (NON_GEOGRAPHIC.test(digits)) {
    return { digits, nonGeographic: true };
  }

  const code = onlyNumbers(countryCode);
  if (code && digits.startsWith(code)) {
    const national = digits.slice(code.length);
    // Brazil: DDD + 8–9 digits, so only strip when 10–11 digits remain (a bare
    // DDD 55 number is left alone). Elsewhere, any plausible national length.
    const strip =
      code === '55'
        ? digits.length > 11 && (national.length === 10 || national.length === 11)
        : national.length >= 7;
    if (strip) {
      digits = national;
    }
  }

  if (digits.startsWith('0') && (digits.length === 11 || digits.length === 12)) {
    digits = digits.slice(1);
  }

  return { digits, nonGeographic: false };
}
