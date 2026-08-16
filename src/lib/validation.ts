import type { BookingRequest } from "@/types/booking";
import { SITE } from "@/config/site";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateBookingRequest(data: BookingRequest): string[] {
  const errors: string[] = [];

  if (!data.vehicleId) errors.push("Fahrzeug fehlt.");
  if (!data.pickupDate || !data.pickupTime) errors.push("Abholzeitpunkt fehlt.");
  if (!data.returnDate || !data.returnTime) errors.push("Rückgabezeitpunkt fehlt.");
  if (!data.tariffId) errors.push("Tarif fehlt.");
  if (!data.kmOptionId) errors.push("Kilometeroption fehlt.");
  if (!data.acceptedTerms) errors.push("Die AGB müssen akzeptiert werden.");

  const c = data.customer;
  if (!c) {
    errors.push("Kundendaten fehlen.");
    return errors;
  }
  if (!c.firstName?.trim()) errors.push("Vorname fehlt.");
  if (!c.lastName?.trim()) errors.push("Nachname fehlt.");
  if (!c.email?.trim() || !EMAIL_REGEX.test(c.email)) errors.push("Gültige E-Mail-Adresse erforderlich.");
  if (!c.phone?.trim()) errors.push("Telefonnummer fehlt.");
  if (!c.street?.trim()) errors.push("Strasse fehlt.");
  if (!c.postalCode?.trim()) errors.push("PLZ fehlt.");
  if (!c.city?.trim()) errors.push("Ort fehlt.");
  if (!c.country?.trim()) errors.push("Land fehlt.");
  if (!c.licenseNumber?.trim()) errors.push("Führerscheinnummer fehlt.");

  if (!c.dateOfBirth) {
    errors.push("Geburtsdatum fehlt.");
  } else {
    const birthDate = new Date(c.dateOfBirth);
    const age = (Date.now() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
    if (Number.isNaN(birthDate.getTime())) {
      errors.push("Geburtsdatum ungültig.");
    } else if (age < SITE.business.minAge) {
      errors.push(`Mindestalter für die Anmietung ist ${SITE.business.minAge} Jahre.`);
    }
  }

  return errors;
}
