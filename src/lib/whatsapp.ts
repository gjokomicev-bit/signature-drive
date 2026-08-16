/** Baut einen wa.me-Link aus einer Telefonnummer (mit oder ohne Formatierung) und optionalem Text. */
export function buildWhatsAppLink(phone: string, message?: string): string {
  const digitsOnly = phone.replace(/[^0-9]/g, "");
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digitsOnly}${query}`;
}
