import { describe, expect, it } from "vitest";
import { formatHour } from "./formatHour.js";

describe("formatHour", () => {
  it("formats as HH:mm", () => {
    expect(formatHour("2024-01-02T13:45:00")).toBe("13:45");
  });

  it("formats with seconds when not simplified", () => {
    expect(formatHour("2024-01-02T13:45:30", false)).toBe("13:45:30");
  });

  it("returns empty string for missing input", () => {
    expect(formatHour()).toBe("");
    expect(formatHour(null)).toBe("");
    expect(formatHour("")).toBe("");
  });
});
