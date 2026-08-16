import Link from "next/link";
import type { Vehicle } from "@/types/vehicle";
import { VehicleMedia } from "./VehicleMedia";
import { formatCurrency } from "@/lib/format";
import { getStartingPrice } from "@/lib/pricing";

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Link href={`/fahrzeuge/${vehicle.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden">
        <VehicleMedia
          vehicle={vehicle}
          src={vehicle.heroImage}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-medium uppercase tracking-[0.05em] text-foreground">
            {vehicle.brand} {vehicle.model}
          </h3>
          <p className="mt-1 text-sm text-foreground/60">{vehicle.shortDescription}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-border-subtle pt-4 text-sm">
        <span className="text-foreground/50">ab {formatCurrency(getStartingPrice(vehicle))}</span>
        <span className="uppercase tracking-[0.2em] text-accent group-hover:underline">Details</span>
      </div>
    </Link>
  );
}
