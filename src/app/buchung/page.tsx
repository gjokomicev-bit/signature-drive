import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { getVehicleBySlug } from "@/config/vehicles";

export const metadata: Metadata = {
  title: "Buchung",
  description: "Fahrzeug, Termin, Tarif und Zusatzleistungen wählen und Ihre Buchungsanfrage senden.",
};

export default async function BuchungPage({
  searchParams,
}: {
  searchParams: Promise<{ vehicle?: string }>;
}) {
  const { vehicle: vehicleSlug } = await searchParams;
  const vehicle = vehicleSlug ? getVehicleBySlug(vehicleSlug) : undefined;

  return (
    <Section tone="light" className="pt-36">
      <Eyebrow>Buchung</Eyebrow>
      <h1 className="mt-4 max-w-2xl text-4xl font-light text-foreground sm:text-5xl">
        Ihre Buchungsanfrage
      </h1>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/60">
        Konfigurieren Sie Ihr Fahrerlebnis in wenigen Schritten. Wir bestätigen Ihre Anfrage
        persönlich innert 24 Stunden.
      </p>

      <div className="mt-16">
        <BookingWizard initialVehicleId={vehicle?.id} />
      </div>
    </Section>
  );
}
