import { getRandomInt } from '../number/getRandomInt.js';

export interface GenerateEmailOptions {
  /** Domain part. Defaults to `"example.com"`. */
  domain?: string;
  /** Length of the generated local part. Defaults to `12`. */
  length?: number;
}

const ALPHANUMERIC = 'abcdefghijklmnopqrstuvwxyz0123456789';

/**
 * Generate a random, valid email address — handy for tests and seeds.
 *
 * Defaults to the `example.com` domain, reserved by RFC 2606 and guaranteed
 * never to route, so a test that accidentally sends mail can't reach anyone.
 * The local part always starts with a letter.
 *
 * @example
 * generateEmail() // e.g. "k3p9xz1qw8ab@example.com"
 * generateEmail({ domain: "mercurius-e2e.com" }) // e.g. "m7t2vd0nps4c@mercurius-e2e.com"
 */
export function generateEmail(options: GenerateEmailOptions = {}): string {
  const { domain = 'example.com', length = 12 } = options;

  const size = Math.max(Math.trunc(length), 1);
  // Leading letter: a local part starting with a digit is legal but reads oddly.
  const first = ALPHANUMERIC.charAt(getRandomInt(0, 25));
  const rest = Array.from({ length: size - 1 }, () =>
    ALPHANUMERIC.charAt(getRandomInt(0, ALPHANUMERIC.length - 1)),
  ).join('');

  return `${first}${rest}@${domain}`;
}
