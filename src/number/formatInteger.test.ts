import { describe, expect, it } from "vitest";
import { formatInteger } from "./formatInteger.js";

describe("formatInteger", () => {
  it("rounds to the nearest integer", () => {
    expect(formatInteger(1.4)).toBe(1);
    expect(formatInteger(1.6)).toBe(2);
  });

  it("rounds negatives", () => {
    expect(formatInteger(-1.6)).toBe(-2);
  });

  it("returns 0 for zero/missing input", () => {
    expect(formatInteger(0)).toBe(0);
    expect(formatInteger()).toBe(0);
  });
});
