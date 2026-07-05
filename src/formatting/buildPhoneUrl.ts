import { onlyNumbers } from './onlyNumbers.js';

interface BuildPhoneUrlOptions {
  /** Country code prefixed to the number. Defaults to `"55"`. `null`/`""` omits the `+` prefix. */
  countryCode?: string | null;
  /** Returned when the phone is empty/missing. Defaults to `""`. */
  fallback?: string;
}

/**
 * Build a `tel:` link from a phone number. Strips non-digits first. With a country
 * code → `tel:+<cc><digits>`; without → `tel:<digits>`. Empty phone → `fallback`.
 *
 * @example
 * buildPhoneUrl("(11) 98765-4321") // "tel:+5511987654321"
 * buildPhoneUrl("11987654321", { countryCode: null }) // "tel:11987654321"
 * buildPhoneUrl(null) // ""
 */
export function buildPhoneUrl(phone?: string | null, options: BuildPhoneUrlOptions = {}): string {
  const { countryCode = '55', fallback = '' } = options;
  const digits = onlyNumbers(phone);
  if (!digits) {
    return fallback;
  }

  const code = onlyNumbers(countryCode);
  return code ? `tel:+${code}${digits}` : `tel:${digits}`;
}
