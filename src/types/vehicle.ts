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

export interface MultiDayDiscountTier {
  /** Ab dieser Anzahl Tage greift der Rabatt (inklusive). */
  minDays: number;
  discountPercent: number;
}

export interface VehiclePricing {
  currency: "CHF";
  deposit: number;
  hourlyRate: {
    pricePerHour: number;
    minHours: number;
    maxHours: number;
    includedKm: number;
  };
  dailyRate: {
    pricePerDay: number;
    includedKmPerDay: number;
    multiDayDiscounts: MultiDayDiscountTier[];
  };
  extraKmPrice: number;
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
