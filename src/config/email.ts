import { SITE } from "@/config/site";

/**
 * Absender- und Empfänger-Konfiguration für den Buchungs-E-Mail-Versand
 * (siehe src/lib/email.ts). "from" muss eine Domain sein, die im
 * Resend-Konto verifiziert wurde (siehe RESEND_API_KEY in .env.example).
 */
export const EMAIL_CONFIG = {
  from: `${SITE.name} <bookings@signature-drive.ch>`,
  bookingNotificationTo: SITE.contact.email,
} as const;
