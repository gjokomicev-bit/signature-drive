/** Kombiniert ein Datum (YYYY-MM-DD) und eine Uhrzeit (HH:mm) zu einem Date-Objekt. */
export function combineDateAndTime(date: string, time: string): Date | null {
  if (!date || !time) return null;
  const iso = `${date}T${time}:00`;
  const parsed = new Date(iso);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function diffInHours(start: Date, end: Date): number {
  return (end.getTime() - start.getTime()) / (1000 * 60 * 60);
}

export function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}
