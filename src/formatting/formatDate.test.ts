import { describe, expect, it } from "vitest";
import { formatDate } from "./formatDate.js";

describe("formatDate", () => {
  it("formats as DD/MM/YY by default", () => {
    expect(formatDate("2024-01-02")).toBe("02/01/24");
  });

  it("formats as DD/MM/YYYY when not simplified", () => {
    expect(formatDate("2024-01-02", false)).toBe("02/01/2024");
  });

  it("returns empty string for missing input", () => {
    expect(formatDate()).toBe("");
    expect(formatDate(null)).toBe("");
    expect(formatDate("")).toBe("");
  });
});
