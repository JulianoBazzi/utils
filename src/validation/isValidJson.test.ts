import { describe, expect, it } from "vitest";
import { isValidJson } from "./isValidJson.js";

describe("isValidJson", () => {
  it("returns true for valid JSON", () => {
    expect(isValidJson('{"a":1}')).toBe(true);
    expect(isValidJson("[1,2,3]")).toBe(true);
  });

  it("returns false for invalid JSON", () => {
    expect(isValidJson("not json")).toBe(false);
  });

  it("returns false for missing input", () => {
    expect(isValidJson()).toBe(false);
    expect(isValidJson("")).toBe(false);
  });
});
