import { describe, expect, it } from "vitest";
import { getOptionId } from "./getOptionId.js";

describe("getOptionId", () => {
  it("returns a numeric id", () => {
    expect(getOptionId({ id: 7 })).toBe(7);
  });

  it("returns a string id", () => {
    expect(getOptionId({ id: "abc" })).toBe("abc");
  });

  it("returns undefined for missing option or id", () => {
    expect(getOptionId()).toBeUndefined();
    expect(getOptionId({})).toBeUndefined();
  });
});
