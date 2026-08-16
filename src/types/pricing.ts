export type BillingMode = "hourly" | "daily";

export interface TariffPlan {
  id: string;
  label: string;
  description: string;
  /** Multiplikator auf den Basis-Stunden-/Tagespreis des Fahrzeugs. */
  priceMultiplier: number;
  /** Multiplikator auf die Basis-Kaution des Fahrzeugs. */
  depositMultiplier: number;
  includedServices: string[];
}

export interface KmOption {
  id: string;
  label: string;
  description: string;
  /** Zusätzliche Kilometer pro Tag oben auf das Basiskontingent des Fahrzeugs. */
  extraKmPerDay: number;
  /** true = unbegrenzte Kilometer, überschreibt extraKmPerDay. */
  unlimited: boolean;
  surchargePerDay: number;
}

export type ExtraPriceType = "flat" | "perDay";

export interface Extra {
  id: string;
  label: string;
  description: string;
  priceType: ExtraPriceType;
  price: number;
}

export interface PriceBreakdownLine {
  label: string;
  amount: number;
}

export interface PriceBreakdown {
  currency: "CHF";
  billingMode: BillingMode;
  units: number;
  unitLabel: string;
  basePrice: number;
  tariffAdjustment: number;
  kmSurcharge: number;
  multiDayDiscount: number;
  extrasTotal: number;
  extrasLines: PriceBreakdownLine[];
  deposit: number;
  subtotal: number;
  total: number;
}
