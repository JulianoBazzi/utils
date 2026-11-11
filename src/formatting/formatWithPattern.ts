export interface FormatWithPatternOptions {
  /**
   * Fill the pattern's remaining slots with this character instead of
   * stopping when the value runs out — the full-width mask an input with a
   * fixed layout (e.g. react-number-format) expects.
   */
  placeholder?: string;
  /** Pattern character that consumes one value character. Defaults to `"#"`. */
  token?: string;
}

/**
 * Apply a character-agnostic mask to a value. Each `token` (`#`) in the
 * pattern consumes the next character from `value`; any other pattern
 * character is emitted as a literal. Stops once the value runs out unless a
 * `placeholder` is given. Returns `""` when the pattern (or, without a
 * placeholder, the value) is missing.
 *
 * Pairs well with `onlyNumbers` / `onlyAlphanumeric` to pre-clean the input.
 *
 * @example
 * formatWithPattern('12345678900', '###.###.###-##') // "123.456.789-00"
 * formatWithPattern('12ABC34501DE35', '##.###.###/####-##') // "12.ABC.345/01DE-35"
 * formatWithPattern('119', '(##) #####-####', { placeholder: '_' }) // "(11) 9____-____"
 */
export function formatWithPattern(
  value?: string | null,
  pattern?: string,
  options: FormatWithPatternOptions = {},
): string {
  const { placeholder, token = '#' } = options;
  if (!pattern || (!value && placeholder === undefined)) {
    return '';
  }

  const chars = [...(value ?? '')];
  let index = 0;
  let output = '';

  for (const char of pattern) {
    if (index >= chars.length && placeholder === undefined) {
      break;
    }
    if (char !== token) {
      output += char;
    } else {
      output += index < chars.length ? chars[index] : placeholder;
      index += 1;
    }
  }

  return output;
}
