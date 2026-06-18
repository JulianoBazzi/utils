import { describe, expect, it } from "vitest";
import { safeDivide } from "./safeDivide.js";

describe("safeDivide", () => {
  it("divides normally", () => {
    expect(safeDivide(10, 2)).toBe(5);
  });

  it("returns 0 for a zero divisor", () => {
    expect(safeDivide(10, 0)).toBe(0);
  });

  it("returns 0 for a negative or missing divisor", () => {
    expect(safeDivide(10, -2)).toBe(0);
    expect(safeDivide(10)).toBe(0);
  });
});
