import type { TariffPlan } from "@/types/pricing";

/**
 * Zentrale Tarif-Pläne. Der Multiplikator wirkt auf den Basis-Stunden-/Tagespreis
 * des jeweiligen Fahrzeugs (siehe src/config/vehicles.ts).
 */
export const TARIFF_PLANS: TariffPlan[] = [
  {
    id: "basic",
    label: "Basic",
    description: "Fairer Einstiegstarif mit Standardleistungen.",
    priceMultiplier: 1,
    depositMultiplier: 1,
    includedServices: [
      "Vollkasko mit Standard-Selbstbehalt",
      "Stornierung bis 72h vor Abholung kostenfrei",
    ],
  },
  {
    id: "comfort",
    label: "Comfort",
    description: "Reduzierter Selbstbehalt und mehr Flexibilität.",
    priceMultiplier: 1.15,
    depositMultiplier: 0.7,
    includedServices: [
      "Vollkasko mit reduziertem Selbstbehalt",
      "Stornierung bis 24h vor Abholung kostenfrei",
      "Kostenlose Zweitfahrer-Registrierung",
    ],
  },
  {
    id: "exclusive",
    label: "Exclusive",
    description: "Das Rundum-sorglos-Paket für höchste Ansprüche.",
    priceMultiplier: 1.35,
    depositMultiplier: 0.4,
    includedServices: [
      "Vollkasko ohne Selbstbehalt",
      "Kostenlose Stornierung bis 12h vor Abholung",
      "Priority Fahrzeugübergabe & Lieferservice",
      "Persönlicher Ansprechpartner",
    ],
  },
];

export function getTariffPlan(id: string): TariffPlan | undefined {
  return TARIFF_PLANS.find((t) => t.id === id);
}
