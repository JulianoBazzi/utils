export interface NetworkInfo {
  /** `navigator.onLine`; `true` during SSR (unknown). */
  isOnline: boolean;
  /** `connection.type` (`"wifi"`, `"cellular"`…), or `"unknown"`. */
  connectionType: string;
  /** `connection.effectiveType` (`"4g"`, `"3g"`…), or `"unknown"`. */
  effectiveType: string;
  /** Estimated bandwidth in Mbps, or `0`. */
  downlink: number;
  /** Estimated round-trip time in ms, or `0`. */
  rtt: number;
  /** Data-saver mode, or `false`. */
  saveData: boolean;
}

// The Network Information API is not in every DOM lib, so it is typed here
// instead of augmenting the consumer's global `Navigator`.
interface NetworkConnection {
  type?: string;
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
}

type NavigatorWithConnection = Navigator & {
  connection?: NetworkConnection;
  mozConnection?: NetworkConnection;
  webkitConnection?: NetworkConnection;
};

/**
 * Snapshot of the browser's network state (Network Information API), e.g.
 * to attach to error reports. Unsupported fields fall back to `"unknown"`/`0`;
 * safe during SSR.
 *
 * @example
 * Sentry.setContext("network", { ...getNetworkInfo() });
 */
export function getNetworkInfo(): NetworkInfo {
  if (typeof navigator === 'undefined') {
    return {
      isOnline: true,
      connectionType: 'unknown',
      effectiveType: 'unknown',
      downlink: 0,
      rtt: 0,
      saveData: false,
    };
  }

  const nav = navigator as NavigatorWithConnection;
  const connection = nav.connection ?? nav.mozConnection ?? nav.webkitConnection;

  return {
    isOnline: nav.onLine,
    connectionType: connection?.type ?? 'unknown',
    effectiveType: connection?.effectiveType ?? 'unknown',
    downlink: connection?.downlink ?? 0,
    rtt: connection?.rtt ?? 0,
    saveData: connection?.saveData ?? false,
  };
}
