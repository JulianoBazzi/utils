import { describe, expect, it } from "vitest";
import { generateOTP } from "./generateOTP.js";

describe("generateOTP", () => {
  it("generates 6 digits by default", () => {
    expect(generateOTP()).toMatch(/^\d{6}$/);
  });

  it("respects a custom length", () => {
    expect(generateOTP(4)).toMatch(/^\d{4}$/);
    expect(generateOTP(10)).toHaveLength(10);
  });
});
