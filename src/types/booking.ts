export interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
  dateOfBirth: string;
  message?: string;
}

export interface BookingRequest {
  vehicleId: string;
  pickupDate: string;
  pickupTime: string;
  /** "package" = Mietdauer-Paket (bracketId/variantId), "custom" = individueller Zeitraum (returnDate/returnTime). */
  pricingMode: "package" | "custom";
  bracketId: string;
  variantId: string;
  /** Nur bei pricingMode "custom". */
  returnDate?: string;
  returnTime?: string;
  extraIds: string[];
  customer: CustomerDetails;
  acceptedTerms: boolean;
  /** Optionale Teilnahme an der "Alpine Signature Drive & Win"-Aktion (siehe src/config/campaign.ts). */
  signatureDriveOptIn: boolean;
  /** Optionaler Gutscheincode zur Einlösung (siehe src/config/vouchers.ts). */
  voucherCode?: string;
}

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface Booking {
  id: string;
  status: BookingStatus;
  createdAt: string;
  request: BookingRequest;
  /** Server-seitig berechneter Abhol-/Rückgabezeitpunkt (ISO), für Verfügbarkeitsprüfung. */
  pickupAt: string;
  returnAt: string;
  priceTotal: number;
  currency: "CHF";
}

export interface BlockedPeriod {
  id: string;
  vehicleId: string;
  start: string;
  end: string;
  reason?: string;
}
