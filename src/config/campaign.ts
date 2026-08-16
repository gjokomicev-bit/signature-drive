/**
 * Zentrale Konfiguration für die optionale "Alpine Signature Drive & Win"-Aktion.
 * Der Rabatt wird automatisch in der Preisberechnung angewendet, sobald der
 * Kunde im Buchungsformular teilnimmt (siehe src/lib/pricing.ts).
 */
export const SIGNATURE_DRIVE_CAMPAIGN = {
  title: "Alpine Signature Drive & Win",
  discountPercent: 10,
  description:
    "10% Rabatt auf diese Buchung. Teile dein Alpine-Signature-Erlebnis auf Instagram mit 1 Story und 2 Posts/Reels. Nach erfolgreicher Veröffentlichung nimmst du automatisch an unserer nächsten Quartalsverlosung teil.",
} as const;
