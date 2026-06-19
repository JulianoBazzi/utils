/**
 * Strip every non-digit character, returning only the numeric characters.
 * Returns an empty string for missing input.
 *
 * @example
 * onlyNumbers("(11) 98765-4321") // "11987654321"
 */
export function onlyNumbers(value?: string | null): string {
  if (!value) return '';
  return value.replace(/[^0-9]/g, '');
}
