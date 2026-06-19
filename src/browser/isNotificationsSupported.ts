/**
 * Check whether the browser supports web push notifications
 * (`Notification`, `serviceWorker`, and `PushManager`). Browser-only.
 *
 * @example
 * if (isNotificationsSupported()) { ... }
 */
export function isNotificationsSupported(): boolean {
  return 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;
}
