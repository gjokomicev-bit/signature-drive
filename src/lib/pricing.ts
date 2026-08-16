import { getTariffPlan } from "@/config/tariffs";
import { getKmOption } from "@/config/km-options";
import { getExtra } from "@/config/extras";
import { combineDateAndTime, diffInHours } from "@/lib/datetime";
import type { Vehicle } from "@/types/vehicle";
import type { PriceBreakdown, PriceBreakdownLine } from "@/types/pricing";

export interface PricingInput {
  vehicle: Vehicle;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  tariffId: string;
  kmOptionId: string;
  extraIds: string[];
}

export type PricingResult =
  | { ok: true; breakdown: PriceBreakdown }
  | { ok: false; error: string };

/**
 * Zentrale Preisberechnung. Alle Preisbestandteile stammen ausschliesslich aus
 * der Konfiguration (src/config) – hier findet keine UI-seitige Preislogik statt.
 */
export function calculatePrice(input: PricingInput): PricingResult {
  const { vehicle } = input;

  const pickup = combineDateAndTime(input.pickupDate, input.pickupTime);
  const returnAt = combineDateAndTime(input.returnDate, input.returnTime);

  if (!pickup || !returnAt) {
    return { ok: false, error: "Bitte Abhol- und Rückgabezeitpunkt vollständig angeben." };
  }
  if (returnAt.getTime() <= pickup.getTime()) {
    return { ok: false, error: "Der Rückgabezeitpunkt muss nach der Abholung liegen." };
  }

  const tariffPlan = getTariffPlan(input.tariffId);
  if (!tariffPlan) {
    return { ok: false, error: "Ungültiger Tarif ausgewählt." };
  }

  const kmOption = getKmOption(input.kmOptionId);
  if (!kmOption) {
    return { ok: false, error: "Ungültige Kilometeroption ausgewählt." };
  }

  const totalHours = diffInHours(pickup, returnAt);
  const { hourlyRate, dailyRate } = vehicle.pricing;

  const billingMode = totalHours <= hourlyRate.maxHours ? "hourly" : "daily";

  let units: number;
  let basePrice: number;
  let unitLabel: string;

  if (billingMode === "hourly") {
    units = Math.max(Math.ceil(totalHours), hourlyRate.minHours);
    basePrice = hourlyRate.pricePerHour * units;
    unitLabel = units === 1 ? "Stunde" : "Stunden";
  } else {
    units = Math.max(Math.ceil(totalHours / 24), 1);
    basePrice = dailyRate.pricePerDay * units;
    unitLabel = units === 1 ? "Tag" : "Tage";
  }

  const priceWithTariff = basePrice * tariffPlan.priceMultiplier;
  const tariffAdjustment = priceWithTariff - basePrice;

  let multiDayDiscount = 0;
  if (billingMode === "daily" && dailyRate.multiDayDiscounts.length > 0) {
    const applicable = dailyRate.multiDayDiscounts.filter((t) => units >= t.minDays);
    if (applicable.length > 0) {
      const bestTier = applicable.reduce((a, b) => (b.discountPercent > a.discountPercent ? b : a));
      multiDayDiscount = priceWithTariff * (bestTier.discountPercent / 100);
    }
  }

  const kmSurcharge = billingMode === "daily" ? kmOption.surchargePerDay * units : kmOption.surchargePerDay;

  const extrasLines: PriceBreakdownLine[] = [];
  for (const extraId of input.extraIds) {
    const extra = getExtra(extraId);
    if (!extra) {
      return { ok: false, error: `Unbekannte Zusatzleistung: ${extraId}` };
    }
    const amount = extra.priceType === "perDay" ? extra.price * units : extra.price;
    extrasLines.push({ label: extra.label, amount });
  }
  const extrasTotal = extrasLines.reduce((sum, l) => sum + l.amount, 0);

  const deposit = vehicle.pricing.deposit * tariffPlan.depositMultiplier;

  const subtotal = priceWithTariff - multiDayDiscount + kmSurcharge + extrasTotal;
  const total = Math.round(subtotal);

  const breakdown: PriceBreakdown = {
    currency: "CHF",
    billingMode,
    units,
    unitLabel,
    basePrice,
    tariffAdjustment,
    kmSurcharge,
    multiDayDiscount,
    extrasTotal,
    extrasLines,
    deposit: Math.round(deposit),
    subtotal,
    total,
  };

  return { ok: true, breakdown };
}

/** Liefert die inkludierten Kilometer pro Tag für ein Fahrzeug + Kilometeroption. */
export function getIncludedKmPerDay(vehicle: Vehicle, kmOptionId: string): number | "unlimited" {
  const kmOption = getKmOption(kmOptionId);
  if (!kmOption) return vehicle.pricing.dailyRate.includedKmPerDay;
  if (kmOption.unlimited) return "unlimited";
  return vehicle.pricing.dailyRate.includedKmPerDay + kmOption.extraKmPerDay;
}
