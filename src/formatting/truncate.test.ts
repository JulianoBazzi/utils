import { describe, expect, it } from "vitest";
import { truncate } from "./truncate.js";

describe("truncate", () => {
  it("appends ellipsis when longer than length", () => {
    expect(truncate("a long sentence", 6)).toBe("a long...");
  });

  it("leaves text at or under length untouched", () => {
    expect(truncate("short", 10)).toBe("short");
    expect(truncate("exactly10!", 10)).toBe("exactly10!");
  });

  it("returns empty string for missing input", () => {
    expect(truncate()).toBe("");
    expect(truncate(null)).toBe("");
  });
});
