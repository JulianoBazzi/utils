import { onlyNumbers } from './onlyNumbers.js';

interface BuildWhatsAppUrlOptions {
  /** Country code prefixed to the number. Defaults to `"55"`. `null`/`""` omits it. */
  countryCode?: string | null;
  /** Returned when the phone is empty/missing. Defaults to `""`. */
  fallback?: string;
}

/**
 * Build a `wa.me` link from a phone number. Strips non-digits first and prefixes
 * the country code. Optional `message` is URL-encoded into `?text=`. Empty phone
 * → `fallback`.
 *
 * @example
 * buildWhatsAppUrl("(11) 98765-4321", "Olá!") // "https://wa.me/5511987654321?text=Ol%C3%A1!"
 * buildWhatsAppUrl("11987654321") // "https://wa.me/5511987654321"
 * buildWhatsAppUrl("11987654321", null, { countryCode: null }) // "https://wa.me/11987654321"
 * buildWhatsAppUrl(null) // ""
 */
export function buildWhatsAppUrl(
  phone?: string | null,
  message?: string | null,
  options: BuildWhatsAppUrlOptions = {},
): string {
  const { countryCode = '55', fallback = '' } = options;
  const digits = onlyNumbers(phone);
  if (!digits) {
    return fallback;
  }

  const url = `https://wa.me/${onlyNumbers(countryCode)}${digits}`;
  return message ? `${url}?text=${encodeURIComponent(message)}` : url;
}
