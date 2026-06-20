/**
 * Apply a character-agnostic mask to a value. Each `#` in the pattern consumes
 * the next character from `value`; any other pattern character is emitted as a
 * literal. Stops once the value runs out. Returns `""` when either is missing.
 *
 * Pairs well with `onlyNumbers` / `onlyAlphanumeric` to pre-clean the input.
 *
 * @example
 * formatWithPattern('12345678900', '###.###.###-##') // "123.456.789-00"
 * formatWithPattern('12ABC34501DE35', '##.###.###/####-##') // "12.ABC.345/01DE-35"
 */
export function formatWithPattern(value?: string | null, pattern?: string): string {
  if (!value || !pattern) {
    return '';
  }

  const chars = [...value];
  let index = 0;
  let output = '';

  for (const token of pattern) {
    if (index >= chars.length) {
      break;
    }
    output += token === '#' ? chars[index++] : token;
  }

  return output;
}
