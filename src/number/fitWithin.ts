export interface Size {
  width: number;
  height: number;
}

/**
 * Scale `width × height` down so the longer edge fits in `maxEdge`, keeping
 * the aspect ratio. Never upscales; results are whole pixels (at least 1 for
 * a non-empty side). An empty size or a non-positive `maxEdge` gives `0 × 0`.
 *
 * @example
 * fitWithin(4000, 3000, 1000) // { width: 1000, height: 750 }
 * fitWithin(800, 600, 1000) // { width: 800, height: 600 }
 */
export function fitWithin(width: number, height: number, maxEdge: number): Size {
  const longest = Math.max(width, height);
  if (!(longest > 0) || !(maxEdge > 0)) {
    return { width: 0, height: 0 };
  }

  const scale = Math.min(1, maxEdge / longest);
  const scaleSide = (side: number) => (side > 0 ? Math.max(1, Math.floor(side * scale)) : 0);
  return { width: scaleSide(width), height: scaleSide(height) };
}
