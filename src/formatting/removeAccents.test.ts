import { describe, expect, it } from "vitest";
import { removeAccents } from "./removeAccents.js";

describe("removeAccents", () => {
  it("strips Portuguese diacritics", () => {
    expect(removeAccents("ção")).toBe("cao");
    expect(removeAccents("João Coração")).toBe("Joao Coracao");
  });

  it("preserves case", () => {
    expect(removeAccents("ÁÉÍÓÚ")).toBe("AEIOU");
  });

  it("leaves unaccented strings unchanged", () => {
    expect(removeAccents("hello world")).toBe("hello world");
  });

  it("returns empty string for missing input", () => {
    expect(removeAccents()).toBe("");
    expect(removeAccents(null)).toBe("");
  });
});
