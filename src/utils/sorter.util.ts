export const sorter = (
  a: string | number | null,
  b: string | number | null
): number => {
  if (typeof a === "string" && typeof b === "string") {
    return textSorter(a, b);
  }

  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  }

  if (a === null && b !== null) return -1;
  if (a !== null && b === null) return 1;
  if (a === null && b === null) return 0;

  return 0;
};

export const textSorter = (a: string | null, b: string | null) => {
  const lowerA = a?.toLowerCase() ?? "";
  const lowerB = b?.toLowerCase() ?? "";
  if (lowerA < lowerB) {
    return -1;
  }
  if (lowerA > lowerB) {
    return 1;
  }
  return 0;
};
