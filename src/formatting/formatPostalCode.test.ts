import { describe, expect, it } from "vitest";
import { formatPostalCode } from "./formatPostalCode.js";

describe("formatPostalCode", () => {
  it("formats as 00000-000", () => {
    expect(formatPostalCode("01310100")).toBe("01310-100");
  });

  it("returns empty string for missing input", () => {
    expect(formatPostalCode()).toBe("");
    expect(formatPostalCode("")).toBe("");
  });
});
