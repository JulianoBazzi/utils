/**
 * Parse one or more comma-separated id strings into a flat list of numbers.
 * Non-string and non-numeric entries are dropped.
 *
 * @example
 * parseIds("1,2", "3") // [1, 2, 3]
 * parseIds("1,abc,4") // [1, 4]
 */
export function parseIds(...ids: Array<string | undefined>): number[] {
  return ids
    .filter((id): id is string => typeof id === "string")
    .flatMap((id) => id.split(","))
    .map(Number)
    .filter((num) => !Number.isNaN(num));
}
