import { describe, expect, it } from "vitest";
import { onlyNumbers } from "./onlyNumbers.js";

describe("onlyNumbers", () => {
  it("strips non-digit characters", () => {
    expect(onlyNumbers("(11) 98765-4321")).toBe("11987654321");
  });

  it("returns empty string when there are no digits", () => {
    expect(onlyNumbers("abc")).toBe("");
  });

  it("returns empty string for missing input", () => {
    expect(onlyNumbers()).toBe("");
    expect(onlyNumbers(null)).toBe("");
  });
});
