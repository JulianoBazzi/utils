import { describe, expect, it } from "vitest";
import { isValidCPF } from "./isValidCPF.js";

describe("isValidCPF", () => {
  it("accepts a valid CPF (masked and unmasked)", () => {
    expect(isValidCPF("52998224725")).toBe(true);
    expect(isValidCPF("529.982.247-25")).toBe(true);
  });

  it("rejects repeated digits", () => {
    expect(isValidCPF("11111111111")).toBe(false);
  });

  it("rejects a bad check digit", () => {
    expect(isValidCPF("52998224724")).toBe(false);
  });

  it("rejects a wrong length", () => {
    expect(isValidCPF("123")).toBe(false);
    expect(isValidCPF()).toBe(false);
  });
});
