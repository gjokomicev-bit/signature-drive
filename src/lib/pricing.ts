import { getExtra } from "@/config/extras";
import { getRateBracket, getRateBracketVariant } from "@/config/rate-brackets";
import { combineDateAndTime } from "@/lib/datetime";
import type { Vehicle } from "@/types/vehicle";
import type { PriceBreakdown, PriceBreakdownLine } from "@/types/pricing";

export interface PricingInput {
  vehicle: Vehicle;
  pickupDate: string;
  pickupTime: string;
  bracketId: string;
  variantId: string;
  extraIds: string[];
}

export type PricingResult =
  | { ok: true; breakdown: PriceBreakdown; returnAt: Date }
  | { ok: false; error: string };

/**
 * Zentrale Preisberechnung anhand des Fixpreis-Rasters (siehe
 * src/config/rate-brackets.ts). Der Rückgabezeitpunkt wird automatisch aus
 * Abholzeitpunkt + Paketdauer berechnet – hier findet keine UI-seitige
 * Preislogik statt.
 */
export function calculatePrice(input: PricingInput): PricingResult {
  const { vehicle } = input;

  const pickup = combineDateAndTime(input.pickupDate, input.pickupTime);
  if (!pickup) {
    return { ok: false, error: "Bitte Abholdatum und -zeit angeben." };
  }

  const bracket = getRateBracket(vehicle.pricing.rateBrackets, input.bracketId);
  if (!bracket) {
    return { ok: false, error: "Ungültiges Mietdauer-Paket ausgewählt." };
  }

  const variant = getRateBracketVariant(bracket, input.variantId);
  if (!variant) {
    return { ok: false, error: "Ungültige Kilometeroption ausgewählt." };
  }

  const returnAt = new Date(pickup.getTime() + bracket.durationHours * 60 * 60 * 1000);

  const extrasLines: PriceBreakdownLine[] = [];
  const days = Math.max(Math.ceil(bracket.durationHours / 24), 1);
  for (const extraId of input.extraIds) {
    const extra = getExtra(extraId);
    if (!extra) {
      return { ok: false, error: `Unbekannte Zusatzleistung: ${extraId}` };
    }
    const amount = extra.priceType === "perDay" ? extra.price * days : extra.price;
    extrasLines.push({ label: extra.label, amount });
  }
  const extrasTotal = extrasLines.reduce((sum, l) => sum + l.amount, 0);

  const subtotal = variant.price + extrasTotal;
  const total = Math.round(subtotal);

  const breakdown: PriceBreakdown = {
    currency: "CHF",
    bracketLabel: bracket.label,
    variantLabel: variant.label,
    includedKm: variant.includedKm,
    basePrice: variant.price,
    extrasTotal,
    extrasLines,
    deposit: vehicle.pricing.deposit,
    subtotal,
    total,
  };

  return { ok: true, breakdown, returnAt };
}

/** Günstigster Fixpreis über alle Mietdauer-Pakete und Varianten eines Fahrzeugs ("ab CHF X"). */
export function getStartingPrice(vehicle: Vehicle): number {
  return Math.min(
    ...vehicle.pricing.rateBrackets.flatMap((bracket) => bracket.variants.map((v) => v.price)),
  );
}
