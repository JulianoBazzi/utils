/**
 * The `{ redirect }` object `getServerSideProps` returns, typed to fit
 * Next's `Redirect`. Temporary (`permanent: false`) by default.
 *
 * @example
 * if (!user) return redirectTo("/login");
 * return redirectTo("/new-home", true);
 */
export function redirectTo(
  destination: string,
  permanent = false,
): { redirect: { destination: string; permanent: boolean } } {
  return { redirect: { destination, permanent } };
}
