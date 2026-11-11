/**
 * Keys that would clash with `Object.prototype`. Skipped whenever query data
 * becomes (or comes from) a plain object.
 *
 * @internal
 */
export const FORBIDDEN_KEYS: ReadonlySet<string> = new Set([
  '__proto__',
  'constructor',
  'prototype',
]);
