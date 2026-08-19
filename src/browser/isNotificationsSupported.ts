/**
 * Check whether the browser supports web push notifications
 * (`Notification`, `serviceWorker`, and `PushManager`). Safe to call during
 * SSR — returns `false` when there is no `window`/`navigator`.
 *
 * @example
 * if (isNotificationsSupported()) { ... }
 */
export function isNotificationsSupported(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  return 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;
}
