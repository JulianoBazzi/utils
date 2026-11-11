import { afterEach, describe, expect, it, vi } from 'vitest';
import { getNetworkInfo } from './getNetworkInfo.js';

describe('getNetworkInfo', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('reads navigator.connection', () => {
    vi.stubGlobal('navigator', {
      onLine: true,
      connection: { type: 'wifi', effectiveType: '4g', downlink: 10, rtt: 50, saveData: true },
    });
    expect(getNetworkInfo()).toEqual({
      isOnline: true,
      connectionType: 'wifi',
      effectiveType: '4g',
      downlink: 10,
      rtt: 50,
      saveData: true,
    });
  });

  it('falls back to vendor-prefixed and missing connections', () => {
    vi.stubGlobal('navigator', { onLine: false, webkitConnection: { effectiveType: '3g' } });
    expect(getNetworkInfo()).toMatchObject({
      isOnline: false,
      effectiveType: '3g',
      connectionType: 'unknown',
    });

    vi.stubGlobal('navigator', { onLine: true, mozConnection: { rtt: 5 } });
    expect(getNetworkInfo().rtt).toBe(5);

    vi.stubGlobal('navigator', { onLine: true });
    expect(getNetworkInfo()).toEqual({
      isOnline: true,
      connectionType: 'unknown',
      effectiveType: 'unknown',
      downlink: 0,
      rtt: 0,
      saveData: false,
    });
  });

  it('is safe during SSR', () => {
    vi.stubGlobal('navigator', undefined);
    expect(getNetworkInfo().isOnline).toBe(true);
  });
});
