import dayjs from "dayjs";
import { describe, expect, it } from "vitest";
import { formatTimeAgo } from "./formatTimeAgo.js";

describe("formatTimeAgo", () => {
  it("formats minutes (plural)", () => {
    expect(formatTimeAgo(dayjs().subtract(5, "minute").toISOString())).toBe("5 minutos");
  });

  it("formats hours (plural)", () => {
    expect(formatTimeAgo(dayjs().subtract(2, "hour").toISOString())).toBe("2 horas");
  });

  it("formats days (plural)", () => {
    expect(formatTimeAgo(dayjs().subtract(5, "day").toISOString())).toBe("5 dias");
  });

  it("uses singular for one day", () => {
    expect(formatTimeAgo(dayjs().subtract(1, "day").subtract(1, "hour").toISOString())).toBe(
      "1 dia",
    );
  });

  it("returns empty string for missing input", () => {
    expect(formatTimeAgo()).toBe("");
    expect(formatTimeAgo(null)).toBe("");
  });
});
