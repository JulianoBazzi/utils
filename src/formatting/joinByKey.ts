import { getProperty } from "../object/getProperty.js";

/**
 * Join a single property of each object in an array into a string.
 * Skips falsy entries. Returns an empty string for an empty/missing array.
 *
 * @example
 * joinByKey([{ name: "a" }, { name: "b" }], "name") // "a | b"
 * joinByKey([{ id: 1 }, { id: 2 }], "id", ", ") // "1, 2"
 */
export function joinByKey<T, K extends keyof T>(values: T[], key: K, divider = " | "): string {
  if (!values?.length) return "";

  return values
    .filter((value): value is T => Boolean(value))
    .map((value) => String(getProperty(value, key)))
    .join(divider);
}
