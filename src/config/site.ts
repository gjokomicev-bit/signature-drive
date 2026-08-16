export const SITE = {
  name: "Signature Drive",
  claim: "Luxury. Performance. Experience.",
  description:
    "Exklusive Vermietung von Performance- und Luxusfahrzeugen in Bern, Berner Oberland, Thun und Interlaken.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.signature-drive.ch",
  region: "Bern · Berner Oberland · Thun · Interlaken",
  contact: {
    email: "info@signature-drive.ch",
    phone: "+41 31 000 00 00",
    whatsapp: "+41 79 000 00 00",
    address: {
      street: "Musterstrasse 1",
      postalCode: "3000",
      city: "Bern",
      country: "Schweiz",
    },
  },
  social: {
    instagram: "https://instagram.com/signaturedrive.ch",
  },
  business: {
    minAge: 21,
    minLicenseYears: 2,
    openingHours: "Mo–Sa, 08:00–19:00 Uhr (individuelle Übergabezeiten auf Anfrage)",
  },
} as const;
