export function getMinDate(dateA?: string, dateB?: string) {
  if (!dateA) return dateB;
  if (!dateB) return dateA;

  return new Date(dateA) < new Date(dateB) ? dateA : dateB;
}

export function addDays(date: string, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

export function todayISO() {
  return new Date().toISOString().split("T")[0];
}
