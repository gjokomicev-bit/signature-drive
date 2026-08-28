export function formatCurrency(amount: number, currency = "CHF"): string {
  return new Intl.NumberFormat("de-CH", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("de-CH", { dateStyle: "medium" }).format(new Date(date));
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("de-CH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function formatDurationHours(hours: number): string {
  const totalHours = Math.round(hours);
  const days = Math.floor(totalHours / 24);
  const remainder = totalHours % 24;
  if (days === 0) return `${totalHours} Std.`;
  if (remainder === 0) return `${days} Tag${days === 1 ? "" : "e"}`;
  return `${days} Tag${days === 1 ? "" : "e"} ${remainder} Std.`;
}
