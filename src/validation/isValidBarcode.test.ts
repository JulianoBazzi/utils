import { describe, expect, it } from "vitest";
import { isValidBarcode } from "./isValidBarcode.js";

describe("isValidBarcode", () => {
  it("accepts a valid EAN-13", () => {
    expect(isValidBarcode("4006381333931")).toBe(true);
  });

  it("accepts a valid EAN-8", () => {
    expect(isValidBarcode("96385074")).toBe(true);
  });

  it("rejects a bad check digit", () => {
    expect(isValidBarcode("4006381333930")).toBe(false);
  });

  it("rejects an invalid length", () => {
    expect(isValidBarcode("123")).toBe(false);
    expect(isValidBarcode("abc")).toBe(false);
  });
});
