/**
 * Zentrale Gutschein-Codes für die Einlösung im Buchungsformular.
 * Demo-Codes – vor Live-Gang durch echte Codes ersetzen bzw. ergänzen.
 * Für eine spätere Datenbank-Anbindung (Einmal-Nutzung, Restguthaben etc.)
 * dieses Modul durch eine Repository-Abfrage ersetzen (siehe
 * src/lib/repositories für das dort verwendete Muster).
 */
export type VoucherDiscountType = "percent" | "flat";

export interface VoucherCode {
  code: string;
  label: string;
  discountType: VoucherDiscountType;
  /** Prozentsatz (0–100) bei "percent", CHF-Betrag bei "flat". */
  value: number;
}

export const VOUCHER_CODES: VoucherCode[] = [
  { code: "SIGNATURE10", label: "10% Rabatt-Gutschein", discountType: "percent", value: 10 },
  { code: "WILLKOMMEN50", label: "CHF 50 Willkommensgutschein", discountType: "flat", value: 50 },
];

export function findVoucher(code: string): VoucherCode | undefined {
  const normalized = code.trim().toUpperCase();
  if (!normalized) return undefined;
  return VOUCHER_CODES.find((v) => v.code === normalized);
}
