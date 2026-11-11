/** `value[key]` when `value` is an object, else `undefined`. @internal */
export function read(value: unknown, key: string): unknown {
  return typeof value === 'object' && value !== null
    ? (value as Record<string, unknown>)[key]
    : undefined;
}
