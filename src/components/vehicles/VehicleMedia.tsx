import Image from "next/image";
import type { Vehicle } from "@/types/vehicle";
import { VehiclePlaceholder } from "./VehiclePlaceholder";
import { hasVehicleImage } from "@/lib/vehicle-image";

/**
 * Rendert das echte Fahrzeugfoto, sobald es unter dem in vehicles.ts
 * hinterlegten Pfad in public/ existiert – andernfalls den Platzhalter.
 */
export function VehicleMedia({
  vehicle,
  src,
  alt,
  className = "",
  label,
  priority,
}: {
  vehicle: Pick<Vehicle, "brand" | "model" | "variant">;
  src: string;
  alt: string;
  className?: string;
  label?: string;
  priority?: boolean;
}) {
  if (hasVehicleImage(src)) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className={`object-cover ${className}`}
      />
    );
  }

  return <VehiclePlaceholder vehicle={vehicle} className={className} label={label} />;
}
