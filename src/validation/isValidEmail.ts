const EMAIL =
  /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[A-Z0-9-]+\.)+[A-Z]{2,63}$/i;

/**
 * Check whether a string is a valid email address. Accepts any TLD from 2 to
 * 63 letters (so `.photography` / `.international` pass).
 * Returns `false` for missing input.
 *
 * @example
 * isValidEmail("user@example.com") // true
 * isValidEmail("no-at") // false
 */
export function isValidEmail(value?: string | null): boolean {
  if (!value) return false;
  return EMAIL.test(value);
}
