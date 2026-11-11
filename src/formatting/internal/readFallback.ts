/**
 * Read `fallback` from an options object, honouring an explicit `undefined`
 * (`{ fallback: undefined }`), which a destructuring default would swallow.
 * Lets the `build*Url` helpers return `undefined` for an `href`.
 *
 * @internal
 */
export function readFallback<F extends string | undefined>(
  options: { fallback?: F },
  defaultValue: string,
): F {
  return ('fallback' in options ? options.fallback : defaultValue) as F;
}
