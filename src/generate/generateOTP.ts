export interface GenerateOTPOptions {
  /** Number of digits. Defaults to `6`. */
  length?: number;
}

// 256 is not a multiple of 10, so bytes 250-255 would over-represent digits 0-5.
// Rejecting them keeps the distribution uniform.
const REJECTION_LIMIT = 250;

/**
 * Generate a numeric one-time password. Leading zeros are preserved (the
 * result is a string, not a number). A non-finite or non-positive `length`
 * yields `""`.
 *
 * Unlike the other generators in this module — which are seed/test helpers
 * backed by `Math.random` — this one draws from the Web Crypto API and is safe
 * for production use such as sign-in codes. Works in Node and in the browser.
 *
 * @example
 * generateOTP() // e.g. "048273"
 * generateOTP({ length: 4 }) // e.g. "0071"
 */
export function generateOTP(options: GenerateOTPOptions = {}): string {
  const { length = 6 } = options;

  const size = Number.isFinite(length) ? Math.max(Math.trunc(length), 0) : 0;
  if (size === 0) {
    return '';
  }

  const bytes = new Uint8Array(size);
  let otp = '';

  while (otp.length < size) {
    crypto.getRandomValues(bytes);

    for (const byte of bytes) {
      if (byte >= REJECTION_LIMIT) {
        continue;
      }

      otp += byte % 10;

      if (otp.length === size) {
        break;
      }
    }
  }

  return otp;
}
