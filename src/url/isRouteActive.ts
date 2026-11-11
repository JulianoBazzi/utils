export interface IsRouteActiveOptions {
  /** Match the whole path only, not its sub-paths. Defaults to `false`. */
  exact?: boolean;
}

// Drop ?query and #hash, then a trailing slash (but keep the root "/").
const cleanPath = (value: string) => {
  const path = value.split(/[?#]/)[0] as string;
  return path.length > 1 ? path.replace(/\/+$/, '') || '/' : path;
};

/**
 * Whether `href` is the active route for `pathname` — a pure function, so it
 * works inside `items.some(...)` where a hook can't be called. Same contract
 * as `useActiveRoute` in `nextjs-utils`:
 *
 * - `?query` and `#hash` are ignored on both sides, and so is a trailing slash.
 * - An empty `href`, or one that is only a query or hash, is never active.
 * - `"/"` only matches exactly.
 * - Without `exact`, a match is by path segment: `/settings` is active on
 *   `/settings/profile` but not on `/settings-old`.
 *
 * @example
 * isRouteActive("/settings/profile", "/settings") // true
 * isRouteActive("/settings-old", "/settings") // false
 * isRouteActive("/a/", "/a", { exact: true }) // true
 * isRouteActive("/a", "/") // false
 */
export function isRouteActive(
  pathname: string | null | undefined,
  href: string,
  options: IsRouteActiveOptions = {},
): boolean {
  if (!pathname) {
    return false;
  }
  const target = cleanPath(href);
  if (!target) {
    return false;
  }

  const current = cleanPath(pathname);
  if (target === '/' || options.exact) {
    return current === target;
  }
  return current === target || current.startsWith(`${target}/`);
}
