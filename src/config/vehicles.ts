import type { Vehicle } from "@/types/vehicle";
import { STANDARD_RATE_BRACKETS } from "@/config/rate-brackets";

/**
 * Zentrale Fahrzeug- und Preiskonfiguration.
 *
 * Preise sind NIRGENDS in UI-Komponenten hinterlegt – jede Änderung hier wirkt
 * sich automatisch auf Fahrzeugseiten, Buchungsstrecke und Preisberechnung aus.
 * Um ein neues Fahrzeug zu ergänzen, einfach ein weiteres Objekt in dieses Array
 * aufnehmen (eindeutige `id` / `slug` beachten).
 */
export const VEHICLES: Vehicle[] = [
  {
    id: "porsche-911-gt3-992-2",
    slug: "porsche-911-gt3-992-2",
    brand: "Porsche",
    model: "911 GT3",
    variant: "992.2 · Weissach-Paket",
    category: "sportwagen",
    year: 2025,
    available: true,
    heroImage: "/vehicles/porsche-911-gt3/hero.jpg",
    gallery: [
      "/vehicles/porsche-911-gt3/gallery-1.jpg",
      "/vehicles/porsche-911-gt3/gallery-2.jpg",
      "/vehicles/porsche-911-gt3/gallery-3.jpg",
      "/vehicles/porsche-911-gt3/gallery-4.jpg",
    ],
    shortDescription:
      "Reinrassiger Motorsport für die Strasse – mit Weissach-Paket und Akrapovič-Anlage.",
    description:
      "Der Porsche 911 GT3 992.2 ist die Essenz des Motorsports auf der Strasse. Der 4,0-Liter-Saugmotor mit 510 PS, das serienmässige Weissach-Paket mit Carbon-Anbauteilen und die Akrapovič-Titan-Abgasanlage machen dieses Fahrzeug zu einem der emotionalsten Sportwagen, die aktuell erhältlich sind. Vollausgestattet mit PDK-Doppelkupplungsgetriebe, Clubsport-Paket und Carbon-Vollschalensitzen – bereit für Passstrasse und Rennstrecke gleichermassen.",
    highlights: [
      "Weissach-Paket (Carbon-Dach, -Sportschalensitze, -Anbauteile)",
      "Akrapovič-Titan-Abgasanlage",
      "4.0L Saugmotor, 510 PS, Drehzahllimit 9'000/min",
      "PDK-Doppelkupplungsgetriebe",
      "Clubsport-Paket inkl. Überrollbügel-Vorbereitung",
      "Vollausstattung: Bose Surround, Vorderachslift, PASM",
    ],
    specs: {
      powerHp: 510,
      acceleration0to100: "3.4 s",
      topSpeedKmh: 312,
      transmission: "PDK Doppelkupplung, 7-Gang",
      drivetrain: "Heckantrieb",
      seats: 2,
      doors: 2,
      fuelType: "Benzin (Super Plus)",
      consumption: "12.9 l/100km",
    },
    pricing: {
      currency: "CHF",
      deposit: 10000,
      extraKmPrice: 8,
      rateBrackets: STANDARD_RATE_BRACKETS,
    },
  },
  {
    id: "lamborghini-urus",
    slug: "lamborghini-urus",
    brand: "Lamborghini",
    model: "Urus S",
    category: "suv",
    year: 2025,
    available: true,
    heroImage: "/vehicles/lamborghini-urus/hero.jpg",
    gallery: [
      "/vehicles/lamborghini-urus/gallery-1.jpg",
      "/vehicles/lamborghini-urus/gallery-2.jpg",
    ],
    shortDescription:
      "Der Super-SUV: brachiale Performance, italienisches Design, Platz für die ganze Familie.",
    description:
      "Der Lamborghini Urus S verbindet die Fahrleistungen eines Supersportwagens mit der Alltagstauglichkeit eines SUV. Der 4,0-Liter-V8-Biturbo leistet 666 PS und katapultiert den Urus in 3.5 Sekunden auf 100 km/h. Fünf Sitzplätze, souveräner Allradantrieb und ein Interieur auf höchstem Niveau machen ihn zum idealen Begleiter für die Passfahrt ebenso wie für den grossen Auftritt.",
    highlights: [
      "4.0L V8 Biturbo, 666 PS",
      "Allradantrieb & Allradlenkung",
      "5 Sitzplätze, grosses Kofferraumvolumen",
      "Adaptives Luftfahrwerk",
      "Bang & Olufsen Sound System",
      "Individualisierbare Fahrmodi (Strada, Sport, Corsa, Neve, Sabbia, Terra)",
    ],
    specs: {
      powerHp: 666,
      acceleration0to100: "3.5 s",
      topSpeedKmh: 305,
      transmission: "8-Gang Automatik",
      drivetrain: "Allradantrieb",
      seats: 5,
      doors: 4,
      fuelType: "Benzin (Super Plus)",
      consumption: "14.1 l/100km",
    },
    pricing: {
      currency: "CHF",
      deposit: 8000,
      extraKmPrice: 5,
      rateBrackets: STANDARD_RATE_BRACKETS,
    },
  },
];

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return VEHICLES.find((v) => v.slug === slug);
}

export function getVehicleById(id: string): Vehicle | undefined {
  return VEHICLES.find((v) => v.id === id);
}

export function getAvailableVehicles(): Vehicle[] {
  return VEHICLES.filter((v) => v.available);
}
