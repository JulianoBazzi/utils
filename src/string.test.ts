import { describe, expect, it } from "vitest";
import { capitalize } from "./string.js";

describe("capitalize", () => {
  it("capitalizes the first character", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  it("returns empty string unchanged", () => {
    expect(capitalize("")).toBe("");
  });

  it("leaves already-capitalized strings intact", () => {
    expect(capitalize("World")).toBe("World");
  });
});
