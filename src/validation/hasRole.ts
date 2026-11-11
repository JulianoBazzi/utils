/**
 * Check whether the current user's role(s) are allowed. Pure, so it works in
 * Server Components, `getServerSideProps` and route handlers.
 *
 * - `current` missing (`null`/`undefined`) → `false` (not authenticated).
 * - `allowed` omitted → `true` (any authenticated user).
 * - `allowed` empty (`[]`) → `false`: a computed list that came out empty
 *   never grants access. (`createCan` 1.x in `nextjs-utils` grants it.)
 * - Otherwise `true` when any of `current` is in `allowed`.
 *
 * @example
 * hasRole("admin", ["admin", "manager"]) // true
 * hasRole(["user", "manager"], ["manager"]) // true
 * hasRole("user") // true
 * hasRole("user", []) // false
 * hasRole(null, ["admin"]) // false
 */
export function hasRole<T>(
  current: T | readonly T[] | null | undefined,
  allowed?: readonly T[],
): boolean {
  if (current === null || current === undefined) {
    return false;
  }
  if (allowed === undefined) {
    return true;
  }

  const roles = (Array.isArray(current) ? current : [current]) as readonly T[];
  return roles.some((role) => allowed.includes(role));
}
