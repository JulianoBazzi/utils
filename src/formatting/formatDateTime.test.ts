import { describe, expect, it } from "vitest";
import { formatDateTime } from "./formatDateTime.js";

describe("formatDateTime", () => {
  it("formats as DD/MM/YY HH:mm", () => {
    expect(formatDateTime("2024-01-02T13:45:00")).toBe("02/01/24 13:45");
  });

  it("uses a 4-digit year when not simplified", () => {
    expect(formatDateTime("2024-01-02T13:45:00", { simplified: false })).toBe("02/01/2024 13:45");
  });

  it("appends seconds when showSeconds is true", () => {
    expect(formatDateTime("2024-01-02T13:45:30", { showSeconds: true })).toBe("02/01/24 13:45:30");
    expect(formatDateTime("2024-01-02T13:45:30", { simplified: false, showSeconds: true })).toBe(
      "02/01/2024 13:45:30",
    );
  });

  it("returns the fallback for missing input", () => {
    expect(formatDateTime()).toBe("");
    expect(formatDateTime(null)).toBe("");
    expect(formatDateTime("")).toBe("");
    expect(formatDateTime(null, { fallback: "Não Informado" })).toBe("Não Informado");
  });
});
