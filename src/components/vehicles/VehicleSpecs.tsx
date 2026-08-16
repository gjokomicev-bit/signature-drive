import type { Vehicle } from "@/types/vehicle";

export function VehicleSpecs({ specs }: { specs: Vehicle["specs"] }) {
  const rows: [string, string][] = [
    ["Leistung", `${specs.powerHp} PS`],
    ["0–100 km/h", specs.acceleration0to100],
    ["Höchstgeschwindigkeit", `${specs.topSpeedKmh} km/h`],
    ["Getriebe", specs.transmission],
    ["Antrieb", specs.drivetrain],
    ["Sitzplätze", String(specs.seats)],
    ["Türen", String(specs.doors)],
    ["Treibstoff", specs.fuelType],
    ...(specs.consumption ? ([["Verbrauch", specs.consumption]] as [string, string][]) : []),
  ];

  return (
    <dl className="divide-y divide-border-subtle border-y border-border-subtle">
      {rows.map(([label, value]) => (
        <div key={label} className="flex items-center justify-between py-3 text-sm">
          <dt className="text-foreground/50">{label}</dt>
          <dd className="font-medium text-foreground">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
