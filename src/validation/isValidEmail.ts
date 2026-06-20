const EMAIL =
  /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[A-Z0-9-]+\.)+[A-Z]{2,10}$/i;

/**
 * Check whether a string is a valid email address.
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
