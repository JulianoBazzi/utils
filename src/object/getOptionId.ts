/**
 * Extract the `id` of a select option / entity-like object.
 * Returns `undefined` when the object or its id is missing.
 *
 * @example
 * getOptionId({ id: 7 }) // 7
 * getOptionId(undefined) // undefined
 */
export function getOptionId<T extends { id?: string | number }>(
  option?: T,
): string | number | undefined {
  return option?.id ?? undefined;
}
