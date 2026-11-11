import { getFileExtension } from './getFileExtension.js';

const MIME_TYPES: Readonly<Record<string, string>> = {
  avif: 'image/avif',
  bmp: 'image/bmp',
  gif: 'image/gif',
  heic: 'image/heic',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  webp: 'image/webp',
  pdf: 'application/pdf',
  json: 'application/json',
  zip: 'application/zip',
  csv: 'text/csv',
  txt: 'text/plain',
  md: 'text/markdown',
  html: 'text/html',
  xml: 'application/xml',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  mp3: 'audio/mpeg',
  m4a: 'audio/mp4',
  ogg: 'audio/ogg',
  wav: 'audio/wav',
  mp4: 'video/mp4',
  mov: 'video/quicktime',
  webm: 'video/webm',
  eml: 'message/rfc822',
};

/**
 * MIME type for a file name or URL, from its extension (case-insensitive;
 * `?query`/`#hash` ignored). Covers common images (webp, bmp, avif, heic…),
 * documents, Office files, audio, video and e-mail. Unknown → `fallback`.
 *
 * @example
 * getMimeType("photo.WEBP") // "image/webp"
 * getMimeType("https://cdn/x.pdf?sig=1") // "application/pdf"
 * getMimeType("archive.rar") // "application/octet-stream"
 */
export function getMimeType(
  fileName?: string | null,
  fallback = 'application/octet-stream',
): string {
  return MIME_TYPES[getFileExtension(fileName).toLowerCase()] ?? fallback;
}
