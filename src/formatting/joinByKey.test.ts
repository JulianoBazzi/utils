import { describe, expect, it } from "vitest";
import { joinByKey } from "./joinByKey.js";

describe("joinByKey", () => {
  it("joins a property with the default divider", () => {
    expect(joinByKey([{ name: "a" }, { name: "b" }], "name")).toBe("a | b");
  });

  it("uses a custom divider with no double spacing", () => {
    expect(joinByKey([{ id: 1 }, { id: 2 }], "id", ", ")).toBe("1, 2");
  });

  it("skips falsy entries", () => {
    const values = [{ name: "a" }, null, { name: "b" }] as Array<{ name: string } | null>;
    expect(joinByKey(values as { name: string }[], "name")).toBe("a | b");
  });

  it("returns empty string for an empty array", () => {
    expect(joinByKey([], "name" as never)).toBe("");
  });
});
