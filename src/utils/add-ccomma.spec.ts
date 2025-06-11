import { addComma } from "./add-comma.util";

describe("addComma", () => {
  it("formats numbers with commas", () => {
    expect(addComma(1234)).toBe("1,234");
    expect(addComma(1234567)).toBe("1,234,567");
    expect(addComma(1234567890)).toBe("1,234,567,890");
  });

  it("handles zero and falsy values", () => {
    expect(addComma(0)).toBe("0");
    expect(addComma(undefined)).toBe("0");
    expect(addComma(null as unknown as string)).toBe("0");
  });
});
