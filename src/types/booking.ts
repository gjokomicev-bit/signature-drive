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
  licenseNumber: string;
  message?: string;
}

export interface BookingRequest {
  vehicleId: string;
  pickupDate: string;
  pickupTime: string;
  bracketId: string;
  variantId: string;
  extraIds: string[];
  customer: CustomerDetails;
  acceptedTerms: boolean;
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
