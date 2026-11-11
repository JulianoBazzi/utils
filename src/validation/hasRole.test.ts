import { describe, expect, it } from 'vitest';
import { hasRole } from './hasRole.js';

describe('hasRole', () => {
  it('checks one or many roles against the allowed list', () => {
    expect(hasRole('admin', ['admin', 'manager'])).toBe(true);
    expect(hasRole(['user', 'manager'], ['manager'])).toBe(true);
    expect(hasRole('user', ['admin'])).toBe(false);
  });

  it('allows any authenticated user when allowed is omitted', () => {
    expect(hasRole('user')).toBe(true);
  });

  it('denies an empty allowed list and a missing user', () => {
    expect(hasRole('user', [])).toBe(false);
    expect(hasRole(null, ['admin'])).toBe(false);
    expect(hasRole(undefined)).toBe(false);
  });
});
