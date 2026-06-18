/**
 * Generate a random numeric one-time password of `length` digits (default 6).
 *
 * @example
 * generateOTP() // "418204"
 * generateOTP(4) // "7391"
 */
export function generateOTP(length = 6): string {
  const digits = "0123456789";
  let otp = "";

  for (let i = 0; i < length; i += 1) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }

  return otp;
}
