/** Recognized runtime environments. Anything else normalizes to `production`. */
export type NodeEnv = 'production' | 'homologation' | 'development' | 'test';

const KNOWN_ENVIRONMENTS: NodeEnv[] = ['production', 'homologation', 'development', 'test'];

/**
 * Normalize a raw `NODE_ENV`-style string into a known environment. Trims and
 * lowercases first; anything unrecognized (or missing) falls back to
 * `"production"`, so a misconfigured deploy never behaves like development.
 *
 * @example
 * formatEnvironment("development") // "development"
 * formatEnvironment(" Homologation ") // "homologation"
 * formatEnvironment("staging") // "production"
 * formatEnvironment(undefined) // "production"
 */
export function formatEnvironment(value?: string | null): NodeEnv {
  const normalized = value?.trim().toLowerCase();

  return KNOWN_ENVIRONMENTS.find((environment) => environment === normalized) ?? 'production';
}
