import { normalizePhone } from './internal/normalizePhone.js';
import { readFallback } from './internal/readFallback.js';
import { onlyNumbers } from './onlyNumbers.js';

export interface BuildPhoneUrlOptions<F extends string | undefined = string> {
  /** Country code prefixed to the number. Defaults to `"55"`. `null`/`""` omits the `+` prefix. */
  countryCode?: string | null;
  /**
   * Returned when the phone is empty/missing. Defaults to `""`. Pass
   * `undefined` explicitly to get `undefined` (handy for an `href`).
   */
  fallback?: F;
}

/**
 * Build a `tel:` link from a phone number. Strips non-digits, a country code
 * already present and a trunk `0`. With a country code → `tel:+<cc><digits>`;
 * without → `tel:<digits>`. Non-geographic numbers (`0800`…) never get a
 * country code. Empty phone → `fallback`.
 *
 * @example
 * buildPhoneUrl("(11) 98765-4321") // "tel:+5511987654321"
 * buildPhoneUrl("+55 11 98765-4321") // "tel:+5511987654321"
 * buildPhoneUrl("0800 123 4567") // "tel:08001234567"
 * buildPhoneUrl("11987654321", { countryCode: null }) // "tel:11987654321"
 */
export function buildPhoneUrl<F extends string | undefined = string>(
  phone?: string | null,
  options: BuildPhoneUrlOptions<F> = {},
): string | F {
  const { countryCode = '55' } = options;
  const fallback = readFallback(options, '');
  const { digits, nonGeographic } = normalizePhone(phone, countryCode);
  if (!digits) {
    return fallback;
  }

  const code = nonGeographic ? '' : onlyNumbers(countryCode);
  return code ? `tel:+${code}${digits}` : `tel:${digits}`;
}
