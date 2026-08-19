/** A single line of a diff, flagged when it has no counterpart on the other side. */
export interface DiffLine {
  text: string;
  changed: boolean;
}

/** Both sides of a line diff, each line flagged as changed or unchanged. */
export interface DiffLinesResult {
  beforeLines: DiffLine[];
  afterLines: DiffLine[];
}

/**
 * Diff two texts line by line, flagging which lines changed on each side.
 * Lines kept by the longest common subsequence come back with `changed: false`;
 * everything else is `changed: true` — so `beforeLines` marks removals and
 * `afterLines` marks additions.
 *
 * Costs O(m×n) in both time and memory (m/n = line counts), which suits
 * audit-log snapshots rather than large files. Missing input counts as `""`,
 * which still yields one (empty) line on that side.
 *
 * @example
 * diffLines("a\nb", "a\nc")
 * // { beforeLines: [{ text: "a", changed: false }, { text: "b", changed: true }],
 * //   afterLines: [{ text: "a", changed: false }, { text: "c", changed: true }] }
 */
export function diffLines(before?: string | null, after?: string | null): DiffLinesResult {
  const a = (before ?? '').split('\n');
  const b = (after ?? '').split('\n');
  const m = a.length;
  const n = b.length;

  // Flat (m+1)×(n+1) table: table[i][j] holds the length of the longest common
  // subsequence of a[i..] and b[j..]. Kept flat so the row lookups stay typed.
  const width = n + 1;
  const table = new Array<number>((m + 1) * width).fill(0);
  const lcs = (i: number, j: number) => table[i * width + j] as number;

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      table[i * width + j] =
        a[i] === b[j] ? lcs(i + 1, j + 1) + 1 : Math.max(lcs(i + 1, j), lcs(i, j + 1));
    }
  }

  const beforeLines: DiffLine[] = a.map((text) => ({ text, changed: true }));
  const afterLines: DiffLine[] = b.map((text) => ({ text, changed: true }));

  // Walk the table forwards, clearing the flag on every pair the subsequence keeps.
  let i = 0;
  let j = 0;
  while (i < m && j < n) {
    if (a[i] === b[j]) {
      (beforeLines[i] as DiffLine).changed = false;
      (afterLines[j] as DiffLine).changed = false;
      i++;
      j++;
    } else if (lcs(i + 1, j) >= lcs(i, j + 1)) {
      i++;
    } else {
      j++;
    }
  }

  return { beforeLines, afterLines };
}
