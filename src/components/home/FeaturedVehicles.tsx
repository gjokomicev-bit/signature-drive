import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { getAvailableVehicles } from "@/config/vehicles";

export function FeaturedVehicles() {
  const vehicles = getAvailableVehicles();

  return (
    <Section tone="surface">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Eyebrow>Die Flotte</Eyebrow>
          <h2 className="mt-4 text-3xl font-light text-foreground sm:text-4xl">Ausgewählte Fahrzeuge</h2>
        </div>
        <Button href="/fahrzeuge" variant="ghost">
          Alle Fahrzeuge ansehen
        </Button>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </Section>
  );
}
