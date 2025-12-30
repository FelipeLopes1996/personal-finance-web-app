export function formatCurrency(value: string, isInput = true) {
  const onlyNumbers = value.replace(/\D/g, "");

  const number = isInput ? Number(onlyNumbers) / 100 : Number(onlyNumbers);

  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
