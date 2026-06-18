import { describe, expect, it } from "vitest";
import { contains } from "./contains.js";

describe("contains", () => {
  it("returns true when the value is present", () => {
    expect(contains("a", ["a", "b"])).toBe(true);
  });

  it("returns false when the value is absent", () => {
    expect(contains(3, [1, 2])).toBe(false);
  });

  it("returns false for a falsy value", () => {
    expect(contains("", ["a"])).toBe(false);
  });
});
