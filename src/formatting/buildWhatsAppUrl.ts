import { normalizePhone } from './internal/normalizePhone.js';
import { readFallback } from './internal/readFallback.js';
import { onlyNumbers } from './onlyNumbers.js';

export interface BuildWhatsAppUrlOptions<F extends string | undefined = string> {
  /** Country code prefixed to the number. Defaults to `"55"`. `null`/`""` omits it. */
  countryCode?: string | null;
  /**
   * Returned when the phone is empty/missing. Defaults to `""`. Pass
   * `undefined` explicitly to get `undefined` (handy for an `href`).
   */
  fallback?: F;
}

/**
 * Build a `wa.me` link from a phone number. Strips non-digits, a country code
 * already present (`"+55 11 98765-4321"` never becomes `wa.me/5555…`) and a
 * trunk `0`, then prefixes `countryCode`. Optional `message` is URL-encoded
 * into `?text=`. Empty phone → `fallback`.
 *
 * @example
 * buildWhatsAppUrl("(11) 98765-4321", "Olá!") // "https://wa.me/5511987654321?text=Ol%C3%A1!"
 * buildWhatsAppUrl("+55 11 98765-4321") // "https://wa.me/5511987654321"
 * buildWhatsAppUrl("11987654321", null, { countryCode: null }) // "https://wa.me/11987654321"
 * buildWhatsAppUrl(null, null, { fallback: undefined }) // undefined
 */
export function buildWhatsAppUrl<F extends string | undefined = string>(
  phone?: string | null,
  message?: string | null,
  options: BuildWhatsAppUrlOptions<F> = {},
): string | F {
  const { countryCode = '55' } = options;
  const fallback = readFallback(options, '');
  const { digits, nonGeographic } = normalizePhone(phone, countryCode);
  if (!digits) {
    return fallback;
  }

  const prefix = nonGeographic ? '' : onlyNumbers(countryCode);
  const url = `https://wa.me/${prefix}${digits}`;
  return message ? `${url}?text=${encodeURIComponent(message)}` : url;
}
