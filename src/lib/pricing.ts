import { getExtra } from "@/config/extras";
import { getRateBracket, getRateBracketVariant } from "@/config/rate-brackets";
import { SIGNATURE_DRIVE_CAMPAIGN } from "@/config/campaign";
import { findVoucher } from "@/config/vouchers";
import { combineDateAndTime, diffInHours } from "@/lib/datetime";
import { formatDurationHours } from "@/lib/format";
import type { Vehicle } from "@/types/vehicle";
import type { PriceBreakdown, PriceBreakdownLine } from "@/types/pricing";

export interface PricingInput {
  vehicle: Vehicle;
  pickupDate: string;
  pickupTime: string;
  pricingMode: "package" | "custom";
  bracketId: string;
  variantId: string;
  returnDate?: string;
  returnTime?: string;
  extraIds: string[];
  signatureDriveOptIn: boolean;
  voucherCode?: string;
}

export type PricingResult =
  | { ok: true; breakdown: PriceBreakdown; returnAt: Date }
  | { ok: false; error: string };

const CUSTOM_MIN_HOURS = 3;
const CUSTOM_MAX_HOURS = 24 * 30;

/**
 * Interpoliert einen Richtpreis für eine beliebige Mietdauer anhand der im
 * Fixpreis-Raster hinterlegten Stützpunkte (unbegrenzte-km-Variante je
 * Paket, sonst die einzige verfügbare Variante). Zwischen zwei Stützpunkten
 * wird linear interpoliert, darüber hinaus mit der Steigung des letzten
 * Segments extrapoliert.
 */
function interpolatePrice(vehicle: Vehicle, hours: number): number {
  const anchors = vehicle.pricing.rateBrackets
    .map((bracket) => {
      const variant = bracket.variants.find((v) => v.id === "unlimited") ?? bracket.variants[0];
      return { hours: bracket.durationHours, price: variant.price };
    })
    .sort((a, b) => a.hours - b.hours);

  if (hours <= anchors[0].hours) return anchors[0].price;

  for (let i = 0; i < anchors.length - 1; i++) {
    const a = anchors[i];
    const b = anchors[i + 1];
    if (hours <= b.hours) {
      const ratio = (hours - a.hours) / (b.hours - a.hours);
      return a.price + ratio * (b.price - a.price);
    }
  }

  const last = anchors[anchors.length - 1];
  const prev = anchors[anchors.length - 2];
  const slope = (last.price - prev.price) / (last.hours - prev.hours);
  return last.price + slope * (hours - last.hours);
}

/**
 * Zentrale Preisberechnung. Unterstützt zwei Modi: feste Mietdauer-Pakete
 * (siehe src/config/rate-brackets.ts) sowie einen individuellen Zeitraum,
 * dessen Richtpreis aus denselben Paketpreisen interpoliert wird – hier
 * findet keine UI-seitige Preislogik statt.
 */
export function calculatePrice(input: PricingInput): PricingResult {
  const { vehicle } = input;

  const pickup = combineDateAndTime(input.pickupDate, input.pickupTime);
  if (!pickup) {
    return { ok: false, error: "Bitte Abholdatum und -zeit angeben." };
  }

  let returnAt: Date;
  let bracketLabel: string;
  let variantLabel: string;
  let includedKm: number | "unlimited";
  let basePrice: number;
  let note: string | undefined;

  if (input.pricingMode === "custom") {
    const parsedReturn = combineDateAndTime(input.returnDate ?? "", input.returnTime ?? "");
    if (!parsedReturn) {
      return { ok: false, error: "Bitte Rückgabedatum und -zeit angeben." };
    }
    if (parsedReturn <= pickup) {
      return { ok: false, error: "Der Rückgabezeitpunkt muss nach der Abholung liegen." };
    }

    const hours = diffInHours(pickup, parsedReturn);
    if (hours < CUSTOM_MIN_HOURS) {
      return { ok: false, error: `Mindestmietdauer beträgt ${CUSTOM_MIN_HOURS} Stunden.` };
    }
    if (hours > CUSTOM_MAX_HOURS) {
      return {
        ok: false,
        error: "Für Mietzeiträume über 30 Tage kontaktieren Sie uns bitte direkt.",
      };
    }

    returnAt = parsedReturn;
    bracketLabel = "Individueller Zeitraum";
    variantLabel = formatDurationHours(hours);
    includedKm = "unlimited";

    let rawPrice = interpolatePrice(vehicle, hours);
    if (hours >= 48) {
      rawPrice += 100;
    }
    basePrice = Math.ceil(rawPrice / 10) * 10;

    note = "Richtpreis inkl. unbegrenzte Kilometer, interpoliert aus unserem Standard-Preisraster.";
  } else {
    const bracket = getRateBracket(vehicle.pricing.rateBrackets, input.bracketId);
    if (!bracket) {
      return { ok: false, error: "Ungültiges Mietdauer-Paket ausgewählt." };
    }

    const variant = getRateBracketVariant(bracket, input.variantId);
    if (!variant) {
      return { ok: false, error: "Ungültige Kilometeroption ausgewählt." };
    }

    returnAt = new Date(pickup.getTime() + bracket.durationHours * 60 * 60 * 1000);
    bracketLabel = bracket.label;
    variantLabel = variant.label;
    includedKm = variant.includedKm;
    basePrice = variant.price;
  }

  const durationHours = diffInHours(pickup, returnAt);
  const days = Math.max(Math.ceil(durationHours / 24), 1);

  const extrasLines: PriceBreakdownLine[] = [];
  for (const extraId of input.extraIds) {
    const extra = getExtra(extraId);
    if (!extra) {
      return { ok: false, error: `Unbekannte Zusatzleistung: ${extraId}` };
    }
    const amount = extra.priceType === "perDay" ? extra.price * days : extra.price;
    extrasLines.push({ label: extra.label, amount });
  }
  const extrasTotal = extrasLines.reduce((sum, l) => sum + l.amount, 0);

  const subtotal = basePrice + extrasTotal;
  const campaignDiscount = input.signatureDriveOptIn
    ? Math.round((subtotal * SIGNATURE_DRIVE_CAMPAIGN.discountPercent) / 100)
    : 0;

  const voucherCodeEntered = Boolean(input.voucherCode?.trim());
  const voucher = voucherCodeEntered ? findVoucher(input.voucherCode!) : undefined;
  const voucherValid = Boolean(voucher);
  const voucherDiscount = voucher
    ? voucher.discountType === "percent"
      ? Math.round((subtotal * voucher.value) / 100)
      : Math.min(voucher.value, subtotal)
    : 0;

  const total = Math.max(Math.round(subtotal - campaignDiscount - voucherDiscount), 0);

  const breakdown: PriceBreakdown = {
    currency: "CHF",
    mode: input.pricingMode,
    bracketLabel,
    variantLabel,
    includedKm,
    basePrice,
    note,
    extrasTotal,
    extrasLines,
    campaignDiscount,
    voucherCodeEntered,
    voucherValid,
    voucherLabel: voucher?.label,
    voucherDiscount,
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
