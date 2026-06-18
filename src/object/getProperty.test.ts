import { describe, expect, it } from "vitest";
import { getProperty } from "./getProperty.js";

describe("getProperty", () => {
  it("returns the value at the given key", () => {
    const obj = { id: 1, name: "x" };
    expect(getProperty(obj, "name")).toBe("x");
    expect(getProperty(obj, "id")).toBe(1);
  });
});
