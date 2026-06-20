/**
 * Extract the `id` of a select option / entity-like object.
 * Returns `undefined` when the object or its id is missing.
 *
 * @example
 * getOptionId({ id: 7 }) // 7
 * getOptionId(undefined) // undefined
 */
export function getOptionId<T extends string | number>(
  option?: { id?: T | null } | null,
): T | undefined {
  return option?.id ?? undefined;
}
