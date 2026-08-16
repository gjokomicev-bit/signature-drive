import type { Extra } from "@/types/pricing";

export const EXTRAS: Extra[] = [
  {
    id: "delivery",
    label: "Lieferung & Abholung",
    description: "Fahrzeugzustellung und -abholung an Ihrem Wunschort in der Region Bern / Thun / Aargau / Zürich.",
    priceType: "flat",
    price: 150,
  },
  {
    id: "additional-driver",
    label: "Zusatzfahrer",
    description: "Registrierung einer weiteren berechtigten Person als Fahrer.",
    priceType: "flat",
    price: 80,
  },
  {
    id: "child-seat",
    label: "Kindersitz",
    description: "Kindersitz nach aktuellem Sicherheitsstandard, pro Miettag.",
    priceType: "perDay",
    price: 15,
  },
];

export function getExtra(id: string): Extra | undefined {
  return EXTRAS.find((e) => e.id === id);
}
