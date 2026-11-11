import { fitWithin, type Size } from '../../number/fitWithin.js';

/**
 * Draw `source` (scaled to fit `maxEdge`, optionally mirrored) onto a new
 * canvas. Throws when the size is empty or a 2D context is unavailable.
 *
 * @internal
 */
export function drawToCanvas(
  source: CanvasImageSource,
  size: Size,
  options: { maxEdge?: number; mirror?: boolean; errorMessage: string },
): HTMLCanvasElement {
  const { maxEdge = Number.POSITIVE_INFINITY, mirror = false, errorMessage } = options;
  const { width, height } = fitWithin(size.width, size.height, maxEdge);
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context || width === 0 || height === 0) {
    throw new Error(errorMessage);
  }

  canvas.width = width;
  canvas.height = height;
  if (mirror) {
    context.translate(width, 0);
    context.scale(-1, 1);
  }
  context.drawImage(source, 0, 0, width, height);
  return canvas;
}
