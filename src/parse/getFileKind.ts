import { getFileExtension } from './getFileExtension.js';

/** Broad category of a file, for picking a preview or an icon. */
export type FileKind =
  | 'image'
  | 'pdf'
  | 'audio'
  | 'video'
  | 'office'
  | 'email'
  | 'markdown'
  | 'text'
  | 'other';

const KINDS: ReadonlyArray<readonly [FileKind, readonly string[]]> = [
  ['image', ['avif', 'bmp', 'gif', 'heic', 'jpeg', 'jpg', 'png', 'svg', 'webp']],
  ['pdf', ['pdf']],
  ['audio', ['aac', 'm4a', 'mp3', 'oga', 'ogg', 'opus', 'wav', 'weba']],
  ['video', ['avi', 'm4v', 'mkv', 'mov', 'mp4', 'webm']],
  ['office', ['doc', 'docx', 'odp', 'ods', 'odt', 'ppt', 'pptx', 'xls', 'xlsx']],
  ['email', ['eml', 'msg']],
  ['markdown', ['markdown', 'md']],
  ['text', ['csv', 'log', 'txt']],
];

/**
 * Broad category of a file name or URL, from its extension
 * (case-insensitive; `?query`/`#hash` ignored, so signed URLs work).
 *
 * @example
 * getFileKind("photo.JPG") // "image"
 * getFileKind("https://bucket/report.pdf?X-Amz-Signature=...") // "pdf"
 * getFileKind("archive.zip") // "other"
 */
export function getFileKind(fileName?: string | null): FileKind {
  const extension = getFileExtension(fileName).toLowerCase();
  return KINDS.find(([, extensions]) => extensions.includes(extension))?.[0] ?? 'other';
}
