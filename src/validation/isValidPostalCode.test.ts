import { describe, expect, it } from "vitest";
import { isValidPostalCode } from "./isValidPostalCode.js";

describe("isValidPostalCode", () => {
  it("accepts an 8-digit CEP (masked and unmasked)", () => {
    expect(isValidPostalCode("01310100")).toBe(true);
    expect(isValidPostalCode("01310-100")).toBe(true);
  });

  it("rejects the wrong length", () => {
    expect(isValidPostalCode("123")).toBe(false);
    expect(isValidPostalCode("013101000")).toBe(false);
    expect(isValidPostalCode()).toBe(false);
  });
});
