// Plain base-10 integers only — rejects "", " ", "0x10", "1e3", "Infinity".
const INTEGER = /^-?\d+$/;

export interface ParseIdsOptions {
  /** Keep only ids greater than zero. Defaults to `false`. */
  positive?: boolean;
  /** Drop repeated ids, keeping the first occurrence. Defaults to `false`. */
  unique?: boolean;
}

/**
 * Parse comma-separated id strings into a flat list of integers. Entries are
 * trimmed; empty, non-string and non-integer entries (e.g. `"abc"`, `"1e3"`,
 * `"0x10"`) are dropped — so `"1,,2"` yields `[1, 2]`, not `[1, 0, 2]`.
 *
 * Pass the strings as an array to add options: `positive` drops `0` and
 * negatives, `unique` drops repeats. The variadic form takes no options.
 *
 * @example
 * parseIds(["1,2", "3"]) // [1, 2, 3]
 * parseIds(["1,0,-2,1"], { positive: true, unique: true }) // [1]
 * parseIds("1,2", "3") // [1, 2, 3]
 * parseIds("1,abc,4") // [1, 4]
 */
export function parseIds(
  values: readonly (string | null | undefined)[],
  options?: ParseIdsOptions,
): number[];
/** Variadic form `parseIds("1,2", "3")`. */
export function parseIds(...ids: Array<string | undefined | null>): number[];
export function parseIds(...args: unknown[]): number[] {
  const [first, second] = args;
  const arrayForm = Array.isArray(first);
  const values = (arrayForm ? first : args) as unknown[];
  const { positive = false, unique = false } = ((arrayForm ? second : undefined) ??
    {}) as ParseIdsOptions;

  const ids = values
    .filter((id): id is string => typeof id === 'string')
    .flatMap((id) => id.split(','))
    .map((entry) => entry.trim())
    .filter((entry) => INTEGER.test(entry))
    .map(Number)
    .filter((num) => Number.isSafeInteger(num) && (!positive || num > 0));

  return unique ? [...new Set(ids)] : ids;
}
