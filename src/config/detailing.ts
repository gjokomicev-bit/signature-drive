/**
 * Zentrale Konfiguration für die Detailing-/Aufbereitungsseite (/aufbereitung).
 * Preise sind Platzhalter – vor Live-Gang mit den echten Preisen ersetzen.
 */
export interface DetailingService {
  id: string;
  title: string;
  features: string[];
  priceFrom: number;
}

export const DETAILING_SERVICES: DetailingService[] = [
  {
    id: "exterior-detail",
    title: "Exterior Detail",
    features: ["Handwäsche", "Felgenreinigung", "Lackreinigung", "Finish"],
    priceFrom: 149,
  },
  {
    id: "interior-detail",
    title: "Interior Detail",
    features: ["Innenraumreinigung", "Lederpflege", "Kunststoffpflege", "Scheiben"],
    priceFrom: 149,
  },
  {
    id: "deep-clean",
    title: "Deep Clean",
    features: ["Intensive Innen- und Aussenaufbereitung"],
    priceFrom: 249,
  },
  {
    id: "paint-correction",
    title: "Paint Correction",
    features: ["Politur und Entfernung bzw. Reduktion von Swirls und leichten Lackdefekten"],
    priceFrom: 349,
  },
  {
    id: "ceramic-protection",
    title: "Ceramic Protection",
    features: ["Keramikversiegelung für Schutz und Glanz"],
    priceFrom: 449,
  },
  {
    id: "sale-preparation",
    title: "Sale Preparation",
    features: ["Komplette Verkaufsaufbereitung für Privatpersonen und Autohändler"],
    priceFrom: 249,
  },
];

export interface BeforeAfterCategory {
  id: string;
  label: string;
}

export const BEFORE_AFTER_CATEGORIES: BeforeAfterCategory[] = [
  { id: "lack", label: "Lack" },
  { id: "felgen", label: "Felgen" },
  { id: "innenraum", label: "Innenraum" },
  { id: "leder", label: "Leder" },
  { id: "stark-verschmutzt", label: "Stark verschmutzte Fahrzeuge" },
];

export interface VoucherType {
  id: string;
  label: string;
  description: string;
}

export const VOUCHER_TYPES: VoucherType[] = [
  { id: "rental", label: "Sportwagenmiete", description: "Ein Gutschein für die Miete eines unserer Performance-Fahrzeuge." },
  { id: "experience", label: "Fahrerlebnisse", description: "Für ein unvergessliches Fahrerlebnis in der Region Bern." },
  { id: "detailing", label: "Fahrzeugaufbereitung", description: "Professionelle Aufbereitung nach Wahl." },
  { id: "custom", label: "Frei wählbarer Betrag", description: "Ein CHF-Betrag Ihrer Wahl, flexibel einlösbar." },
];

export const DETAILING_USPS: string[] = [
  "Premium-Fahrzeuge",
  "Professionelle Fahrzeugpflege",
  "Persönliche Übergabe",
  "Flexible Buchungszeiten",
  "Höchster Qualitätsanspruch",
  "Standort Region Bern",
];
