export function formatCurrency(value: string | number) {
  if (value === null || value === undefined) return "";

  const stringValue = String(value);

  const normalized = stringValue.replace(",", ".");

  const number = Number(normalized);

  if (isNaN(number)) return "";

  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}

export function currencyMask(value: string) {
  const onlyNumbers = value.replace(/\D/g, "");

  if (!onlyNumbers) return "";

  const number = Number(onlyNumbers) / 100;

  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
