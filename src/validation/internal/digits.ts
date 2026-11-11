/**
 * Numeric value of the character at `index`, as `charCodeAt - 48`. Digits map
 * to 0–9 and uppercase letters to 17–42, which is what the alphanumeric CNPJ
 * check digit expects.
 *
 * @internal
 */
export function digitAt(value: string, index: number): number {
  return value.charCodeAt(index) - 48;
}

/**
 * `true` when every character is the same (e.g. `"11111111111"`), the
 * sequences every Brazilian document validator rejects.
 *
 * @internal
 */
export function isRepeated(value: string): boolean {
  return /^(.)\1*$/.test(value);
}
