import { parseJson } from '../parse/parseJson.js';
import { type CookieSource, getCookie } from './getCookie.js';

/**
 * Read a cookie holding JSON and parse it. Missing cookie or invalid JSON →
 * `null`. Same sources as {@link getCookie}.
 *
 * @example
 * const store = readJsonCookie<Store>("store", context.req);
 */
export function readJsonCookie<T>(name: string, source?: CookieSource): T | null {
  return parseJson<T>(getCookie(name, source)) ?? null;
}
