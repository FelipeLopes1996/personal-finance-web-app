export function parseCurrencyToNumber(value: string) {
  return Number(
    value
      .replace(/\./g, "")
      .replace(",", ".")
      .replace(/[^\d.]/g, "")
  );
}
