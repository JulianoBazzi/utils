import { describe, expect, it } from "vitest";
import { isValidPhone } from "./isValidPhone.js";

describe("isValidPhone", () => {
  it("accepts a valid mobile number", () => {
    expect(isValidPhone("(11) 98765-4321")).toBe(true);
    expect(isValidPhone("11987654321")).toBe(true);
  });

  it("accepts a valid landline", () => {
    expect(isValidPhone("1133334444")).toBe(true);
    expect(isValidPhone("33334444")).toBe(true);
  });

  it("rejects repeated digits", () => {
    expect(isValidPhone("11111111")).toBe(false);
  });

  it("rejects too short numbers", () => {
    expect(isValidPhone("1234")).toBe(false);
  });

  it("rejects a DDD starting with 0", () => {
    expect(isValidPhone("0133334444")).toBe(false);
  });
});
