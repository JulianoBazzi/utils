/**
 * Normalize a "positional value or options object" argument, the pattern the
 * library uses to move positional parameters into an options object without
 * breaking existing calls. An object is returned as is; anything else becomes
 * `{ [key]: value }`, merged over `rest`.
 *
 * @internal
 */
export function resolveOptions<O extends object, K extends keyof O>(
  arg: O | O[K] | undefined,
  key: K,
  rest?: Omit<O, K>,
): Partial<O> {
  if (typeof arg === 'object' && arg !== null) {
    return arg as O;
  }
  return { ...rest, [key]: arg } as Partial<O>;
}
