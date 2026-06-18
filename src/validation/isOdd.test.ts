import { describe, expect, it } from "vitest";
import { isOdd } from "./isOdd.js";

describe("isOdd", () => {
  it("returns true for positive odd numbers", () => {
    expect(isOdd(3)).toBe(true);
  });

  it("returns true for negative odd numbers", () => {
    expect(isOdd(-3)).toBe(true);
  });

  it("returns false for even numbers and zero", () => {
    expect(isOdd(4)).toBe(false);
    expect(isOdd(-4)).toBe(false);
    expect(isOdd(0)).toBe(false);
  });
});
