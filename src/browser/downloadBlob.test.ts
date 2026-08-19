// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { downloadBlob } from './downloadBlob.js';

const createObjectURL = vi.fn((_blob: Blob) => 'blob:mock-url');
const revokeObjectURL = vi.fn();

let clicked: HTMLAnchorElement | undefined;
let attachedWhenClicked = false;

beforeEach(() => {
  clicked = undefined;
  attachedWhenClicked = false;
  createObjectURL.mockClear();
  revokeObjectURL.mockClear();

  vi.stubGlobal('URL', { createObjectURL, revokeObjectURL });
  vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (
    this: HTMLAnchorElement,
  ) {
    clicked = this;
    attachedWhenClicked = document.body.contains(this);
  });
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('downloadBlob', () => {
  it('clicks an anchor carrying the object URL and the file name', () => {
    const blob = new Blob(['a,b'], { type: 'text/csv' });

    downloadBlob(blob, 'report.csv');

    expect(createObjectURL).toHaveBeenCalledWith(blob);
    expect(clicked?.download).toBe('report.csv');
    expect(clicked?.getAttribute('href')).toBe('blob:mock-url');
  });

  it('attaches the anchor to the document before clicking and removes it after', () => {
    downloadBlob(new Blob(['a']), 'a.txt');

    expect(attachedWhenClicked).toBe(true);
    expect(document.body.contains(clicked as HTMLAnchorElement)).toBe(false);
  });

  it('revokes the object URL', () => {
    downloadBlob(new Blob(['a']), 'a.txt');

    expect(revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
  });
});
