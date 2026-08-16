import type { RateBracket } from "@/types/pricing";

/**
 * Zentrales Preisraster (Fixpreise pro Mietdauer-Paket). Gilt aktuell für die
 * gesamte Flotte identisch – wird in vehicles.ts pro Fahrzeug referenziert.
 * Soll ein Fahrzeug künftig eigene Preise erhalten, dort einfach ein eigenes
 * RateBracket[]-Array statt STANDARD_RATE_BRACKETS hinterlegen.
 */
export const STANDARD_RATE_BRACKETS: RateBracket[] = [
  {
    id: "3h",
    label: "3 Stunden",
    durationHours: 3,
    variants: [{ id: "unlimited", label: "Unbegrenzt", includedKm: "unlimited", price: 490 }],
  },
  {
    id: "6h",
    label: "6 Stunden",
    durationHours: 6,
    variants: [{ id: "unlimited", label: "Unbegrenzt", includedKm: "unlimited", price: 790 }],
  },
  {
    id: "12h",
    label: "12 Stunden",
    durationHours: 12,
    variants: [{ id: "unlimited", label: "Unbegrenzt", includedKm: "unlimited", price: 1290 }],
  },
  {
    id: "24h",
    label: "24 Stunden",
    durationHours: 24,
    variants: [
      { id: "unlimited", label: "Unbegrenzt", includedKm: "unlimited", price: 1890 },
      { id: "included-300", label: "300 km inklusive", includedKm: 300, price: 1290 },
    ],
  },
  {
    id: "48h",
    label: "48 Stunden",
    durationHours: 48,
    variants: [
      { id: "unlimited", label: "Unbegrenzt", includedKm: "unlimited", price: 2590 },
      { id: "included-600", label: "600 km inklusive", includedKm: 600, price: 1990 },
    ],
  },
  {
    id: "workweek",
    label: "Mo–Fr",
    // Annahme: Abholung Montag, Rückgabe Freitag = 4 Tage. Bei Bedarf anpassen.
    durationHours: 96,
    variants: [{ id: "included-650", label: "650 km inklusive", includedKm: 650, price: 2900 }],
  },
];

export function getRateBracket(brackets: RateBracket[], bracketId: string): RateBracket | undefined {
  return brackets.find((b) => b.id === bracketId);
}

export function getRateBracketVariant(bracket: RateBracket, variantId: string) {
  return bracket.variants.find((v) => v.id === variantId);
}
