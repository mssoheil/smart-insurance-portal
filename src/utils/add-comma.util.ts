export function addComma(value?: string | number) {
  return new Intl.NumberFormat("en-US").format(Number(value || 0));
}
