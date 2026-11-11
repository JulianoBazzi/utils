export interface TitleCaseOptions {
  /** Lowercase the whole value first, so `"JOÃO"` becomes `"João"`. Defaults to `false`. */
  normalize?: boolean;
  /**
   * Words kept in lowercase unless they open the text (e.g. Portuguese
   * connectives such as `de`, `da`, `do`, `dos`, `das`, `e`). Compared
   * case-insensitively. Defaults to none.
   */
  lowercaseWords?: readonly string[];
}

/**
 * Uppercase the first character and keep the rest untouched.
 *
 * @internal
 */
export function capitalize(value: string): string {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

/**
 * Uppercase the first letter of each whitespace-separated word. Without
 * `normalize`, the rest of each word is preserved (`"1.50 KB"` stays intact).
 *
 * @internal
 */
export function titleCase(value: string, options: TitleCaseOptions = {}): string {
  const { normalize = false, lowercaseWords } = options;
  const source = normalize ? value.toLowerCase() : value;
  const keepLower = new Set(lowercaseWords?.map((word) => word.toLowerCase()));
  let first = true;

  return source.replace(/\S+/g, (word) => {
    const isFirst = first;
    first = false;
    if (!isFirst && keepLower.has(word.toLowerCase())) {
      return word.toLowerCase();
    }
    return capitalize(word);
  });
}
