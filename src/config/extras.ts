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
    id: "young-driver",
    label: "Jungfahrer (21–25 Jahre)",
    description: "Freigabe für Fahrer zwischen 21 und 25 Jahren.",
    priceType: "flat",
    price: 120,
  },
  {
    id: "premium-cleaning",
    label: "Premium-Aufbereitung bei Rückgabe",
    description: "Wir übernehmen die professionelle Innen- und Aussenreinigung nach Ihrer Fahrt.",
    priceType: "flat",
    price: 190,
  },
  {
    id: "child-seat",
    label: "Kindersitz",
    description: "Kindersitz nach aktuellem Sicherheitsstandard, pro Miettag.",
    priceType: "perDay",
    price: 15,
  },
  {
    id: "second-key",
    label: "Zweitschlüssel-Übergabe",
    description: "Übergabe eines zweiten Fahrzeugschlüssels für mehr Flexibilität.",
    priceType: "flat",
    price: 50,
  },
];

export function getExtra(id: string): Extra | undefined {
  return EXTRAS.find((e) => e.id === id);
}
