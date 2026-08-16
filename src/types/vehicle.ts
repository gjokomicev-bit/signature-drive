import type { RateBracket } from "./pricing";

export type VehicleCategory = "sportwagen" | "suv" | "cabrio" | "limousine";

export interface VehicleSpecs {
  powerHp: number;
  acceleration0to100: string;
  topSpeedKmh: number;
  transmission: string;
  drivetrain: string;
  seats: number;
  doors: number;
  fuelType: string;
  consumption?: string;
}

export interface VehiclePricing {
  currency: "CHF";
  /** Preis pro Mehrkilometer, sobald das inkludierte Kontingent einer Variante überschritten wird. */
  extraKmPrice: number;
  rateBrackets: RateBracket[];
}

export interface Vehicle {
  id: string;
  slug: string;
  brand: string;
  model: string;
  variant?: string;
  category: VehicleCategory;
  year: number;
  available: boolean;
  heroImage: string;
  gallery: string[];
  shortDescription: string;
  description: string;
  highlights: string[];
  specs: VehicleSpecs;
  pricing: VehiclePricing;
}
