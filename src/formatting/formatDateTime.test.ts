import { describe, expect, it } from "vitest";
import { formatDateTime } from "./formatDateTime.js";

describe("formatDateTime", () => {
  it("formats as DD/MM/YY HH:mm", () => {
    expect(formatDateTime("2024-01-02T13:45:00")).toBe("02/01/24 13:45");
  });

  it("uses a 4-digit year when not simplified", () => {
    expect(formatDateTime("2024-01-02T13:45:00", false)).toBe("02/01/2024 13:45");
  });

  it("returns empty string for missing input", () => {
    expect(formatDateTime()).toBe("");
    expect(formatDateTime(null)).toBe("");
    expect(formatDateTime("")).toBe("");
  });
});
