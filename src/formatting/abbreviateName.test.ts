import { describe, expect, it } from "vitest";
import { abbreviateName } from "./abbreviateName.js";

describe("abbreviateName", () => {
  it("abbreviates first name + last initial", () => {
    expect(abbreviateName("John Smith")).toBe("John S.");
  });

  it("returns single-word names unchanged", () => {
    expect(abbreviateName("John")).toBe("John");
  });

  it("trims and collapses extra whitespace", () => {
    expect(abbreviateName("  John   Smith  ")).toBe("John S.");
  });

  it("returns empty string for missing input", () => {
    expect(abbreviateName()).toBe("");
    expect(abbreviateName("")).toBe("");
  });
});
