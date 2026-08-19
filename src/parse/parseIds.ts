// Plain base-10 integers only — rejects "", " ", "0x10", "1e3", "Infinity".
const INTEGER = /^-?\d+$/;

/**
 * Parse one or more comma-separated id strings into a flat list of integers.
 * Entries are trimmed; empty, non-string and non-integer entries (e.g. `"abc"`,
 * `"1e3"`, `"0x10"`) are dropped — so `"1,,2"` yields `[1, 2]`, not `[1, 0, 2]`.
 *
 * @example
 * parseIds("1,2", "3") // [1, 2, 3]
 * parseIds("1,abc,4") // [1, 4]
 * parseIds("1, ,2") // [1, 2]
 */
export function parseIds(...ids: Array<string | undefined | null>): number[] {
  return ids
    .filter((id): id is string => typeof id === 'string')
    .flatMap((id) => id.split(','))
    .map((entry) => entry.trim())
    .filter((entry) => INTEGER.test(entry))
    .map(Number)
    .filter((num) => Number.isSafeInteger(num));
}
