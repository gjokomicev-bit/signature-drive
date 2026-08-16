import type { KmOption } from "@/types/pricing";

/**
 * Zentrale Kilometeroptionen. `extraKmPerDay` kommt on top auf das im Fahrzeug
 * hinterlegte Basiskontingent; `unlimited: true` hebt jedes Limit auf.
 */
export const KM_OPTIONS: KmOption[] = [
  {
    id: "standard",
    label: "Standard",
    description: "Das im Fahrzeug hinterlegte Kilometerkontingent pro Tag.",
    extraKmPerDay: 0,
    unlimited: false,
    surchargePerDay: 0,
  },
  {
    id: "extended",
    label: "Erweitert (+100 km/Tag)",
    description: "100 zusätzliche Kilometer pro Tag inklusive.",
    extraKmPerDay: 100,
    unlimited: false,
    surchargePerDay: 45,
  },
  {
    id: "unlimited",
    label: "Unbegrenzt",
    description: "Fahren ohne Kilometerlimit – ideal für längere Touren.",
    extraKmPerDay: 0,
    unlimited: true,
    surchargePerDay: 120,
  },
];

export function getKmOption(id: string): KmOption | undefined {
  return KM_OPTIONS.find((k) => k.id === id);
}
