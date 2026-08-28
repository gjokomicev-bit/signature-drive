/**
 * Eine Preisvariante innerhalb eines Mietdauer-Pakets (z.B. "unbegrenzt" oder
 * "300 km inklusive"). Jedes Rate-Bracket hat mindestens eine Variante.
 */
export interface RateBracketVariant {
  id: string;
  label: string;
  /** "unlimited" = keine Kilometerbegrenzung, sonst inkludierte km für dieses Paket. */
  includedKm: number | "unlimited";
  price: number;
}

/**
 * Ein Mietdauer-Paket aus dem Preisraster (z.B. "24 Stunden"). Der Kunde wählt
 * ein Paket und darin eine Preisvariante – der Gesamtpreis ist ein Fixpreis,
 * keine berechnete Rate.
 */
export interface RateBracket {
  id: string;
  label: string;
  /** Für die automatische Berechnung des Rückgabezeitpunkts ab Abholung. */
  durationHours: number;
  variants: RateBracketVariant[];
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
  bracketLabel: string;
  variantLabel: string;
  includedKm: number | "unlimited";
  basePrice: number;
  extrasTotal: number;
  extrasLines: PriceBreakdownLine[];
  campaignDiscount: number;
  voucherCodeEntered: boolean;
  voucherValid: boolean;
  voucherLabel?: string;
  voucherDiscount: number;
  subtotal: number;
  total: number;
}
