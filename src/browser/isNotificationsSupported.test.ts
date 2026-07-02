// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { isNotificationsSupported } from './isNotificationsSupported.js';

interface StubOptions {
  notification?: boolean;
  serviceWorker?: boolean;
  pushManager?: boolean;
}

function stubEnvironment(options: StubOptions = {}) {
  const { notification = true, serviceWorker = true, pushManager = true } = options;
  const win: Record<string, unknown> = {};

  if (notification) win.Notification = class {};
  if (pushManager) win.PushManager = class {};

  vi.stubGlobal('window', win);
  vi.stubGlobal('navigator', serviceWorker ? { serviceWorker: {} } : {});
}

describe('isNotificationsSupported', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns true when Notification, serviceWorker and PushManager are available', () => {
    stubEnvironment();
    expect(isNotificationsSupported()).toBe(true);
  });

  it('returns false when Notification is missing', () => {
    stubEnvironment({ notification: false });
    expect(isNotificationsSupported()).toBe(false);
  });

  it('returns false when serviceWorker is missing', () => {
    stubEnvironment({ serviceWorker: false });
    expect(isNotificationsSupported()).toBe(false);
  });

  it('returns false when PushManager is missing', () => {
    stubEnvironment({ pushManager: false });
    expect(isNotificationsSupported()).toBe(false);
  });
});
