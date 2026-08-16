import type { Vehicle } from "@/types/vehicle";

/**
 * Platzhalter-Bildfläche, solange keine lizenzierte Fahrzeugfotografie vorliegt.
 * Sobald echte Fotos verfügbar sind, an dieser Stelle durch <Image src={vehicle.heroImage} .../>
 * ersetzen – die Pfade sind bereits in src/config/vehicles.ts hinterlegt.
 */
export function VehiclePlaceholder({
  vehicle,
  className = "",
  label,
}: {
  vehicle: Pick<Vehicle, "brand" | "model" | "variant">;
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-ink ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(circle at 30% 20%, rgba(176,141,87,0.16), transparent 55%), linear-gradient(135deg, #141416 0%, #0a0a0a 60%, #030303 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 64px)",
        }}
      />
      <div className="absolute inset-4 border border-ink-foreground/15 sm:inset-6" />
      <div className="relative flex flex-col items-center gap-3 px-6 text-center">
        <span className="text-[11px] font-medium uppercase tracking-[0.4em] text-ink-foreground/50">
          {label ?? "Signature Drive"}
        </span>
        <span className="font-light uppercase tracking-[0.08em] text-ink-foreground text-3xl sm:text-4xl md:text-5xl">
          {vehicle.brand}
        </span>
        <span className="text-sm uppercase tracking-[0.3em] text-accent">
          {vehicle.model}
          {vehicle.variant ? ` · ${vehicle.variant}` : ""}
        </span>
      </div>
    </div>
  );
}
