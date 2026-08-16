import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { VEHICLES } from "@/config/vehicles";

export const metadata: Metadata = {
  title: "Fahrzeuge",
  description: "Unsere Flotte an Performance- und Luxusfahrzeugen zur exklusiven Vermietung in der Schweiz.",
};

export default function FahrzeugePage() {
  return (
    <Section tone="light" className="pt-36">
      <Eyebrow>Die Flotte</Eyebrow>
      <h1 className="mt-4 max-w-2xl text-4xl font-light text-foreground sm:text-5xl">
        Unsere Fahrzeuge
      </h1>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/60">
        Jedes Fahrzeug wird in Vollausstattung und bestem Zustand übergeben. Die Flotte wird
        laufend um weitere aussergewöhnliche Modelle ergänzt.
      </p>

      <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
        {VEHICLES.map((vehicle) => (
          <div key={vehicle.id} className="relative">
            {!vehicle.available && (
              <span className="absolute right-0 top-0 z-10 bg-ink px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-ink-foreground">
                Auf Anfrage
              </span>
            )}
            <VehicleCard vehicle={vehicle} />
          </div>
        ))}
      </div>
    </Section>
  );
}
