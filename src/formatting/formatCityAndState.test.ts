import { describe, expect, it } from "vitest";
import { formatCityAndState } from "./formatCityAndState.js";

describe("formatCityAndState", () => {
  it("joins city and state", () => {
    expect(formatCityAndState("São Paulo", "SP")).toBe("São Paulo - SP");
  });

  it("omits the dash when only one is present", () => {
    expect(formatCityAndState("São Paulo")).toBe("São Paulo");
    expect(formatCityAndState(undefined, "SP")).toBe("SP");
  });

  it("returns the fallback when both are empty", () => {
    expect(formatCityAndState()).toBe("Não Informado");
    expect(formatCityAndState("", "")).toBe("Não Informado");
  });
});
