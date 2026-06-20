const UF =
  /^(?:AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)$/i;

/**
 * Check whether a string is a valid Brazilian state code (UF), e.g. `"SP"`.
 * Case-insensitive. Returns `false` for missing input.
 *
 * @example
 * isValidUF("SP") // true
 * isValidUF("XX") // false
 */
export function isValidUF(value?: string | null): boolean {
  if (!value) return false;
  return UF.test(value);
}
