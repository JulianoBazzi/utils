import { drawToCanvas } from './internal/drawToCanvas.js';

export interface CaptureVideoFrameOptions {
  /** Longest edge of the frame, in pixels. Defaults to the video's own size. */
  maxEdge?: number;
  /** Encoder quality (0–1) for lossy formats. Defaults to `0.75`. */
  quality?: number;
  /** Output format. Defaults to `"image/jpeg"`. */
  mimeType?: string;
  /** Flip horizontally, matching what a selfie preview shows. Defaults to `false`. */
  mirror?: boolean;
}

/**
 * Grab the current frame of a `<video>` (e.g. a camera stream) as a `data:`
 * URL, optionally scaled down and mirrored. Throws when the video has no
 * frame yet (0×0).
 *
 * Browser-only — relies on `canvas`.
 *
 * @example
 * const photo = captureVideoFrame(videoRef.current, { maxEdge: 960, mirror: true });
 */
export function captureVideoFrame(
  video: HTMLVideoElement,
  options: CaptureVideoFrameOptions = {},
): string {
  const { maxEdge, quality = 0.75, mimeType = 'image/jpeg', mirror = false } = options;
  const canvas = drawToCanvas(
    video,
    { width: video.videoWidth, height: video.videoHeight },
    { maxEdge, mirror, errorMessage: 'Não foi possível capturar a imagem da câmera.' },
  );
  return canvas.toDataURL(mimeType, quality);
}
