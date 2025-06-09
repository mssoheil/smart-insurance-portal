import { sorter, textSorter } from "./sorter.util";

describe("textSorter", () => {
  it("should return -1 if a < b as a text", () => {
    expect(textSorter("Female", "Male")).toBe(-1);
  });

  it("should return 1 if a > b as a text", () => {
    expect(textSorter("Male", "Female")).toBe(1);
  });

  it("should return 0 if a == b as a text", () => {
    expect(textSorter("Male", "Male")).toBe(0);
  });
});

describe("sorter", () => {
  it("should return -1 if a < b as a text", () => {
    expect(sorter("Female", "Male")).toBe(-1);
  });

  it("should return 1 if a > b as a text", () => {
    expect(sorter("Male", "Female")).toBe(1);
  });

  it("should return 0 if a == b as a text", () => {
    expect(sorter("Male", "Male")).toBe(0);
  });

  it("should return -1 if a is null and be is text", () => {
    expect(sorter(null, "Male")).toBe(-1);
  });

  it("should return 1 if a is text and be is null", () => {
    expect(sorter("Male", null)).toBe(1);
  });

  it("should return 0 if a and b are null", () => {
    expect(sorter(null, null)).toBe(0);
  });

  it("should return 0 if a == b as a number", () => {
    expect(sorter(1, 1)).toBe(0);
  });

  it("should return -1 if a < b as a number", () => {
    expect(sorter(1, 2)).toBe(-1);
  });

  it("should return 1 if a > b as a number", () => {
    expect(sorter(2, 1)).toBe(1);
  });
});
