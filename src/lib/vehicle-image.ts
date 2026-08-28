import { hasPublicFile } from "@/lib/public-file";

/**
 * Prüft server-seitig, ob unter public/ bereits eine echte Fahrzeugdatei
 * hinterlegt wurde. Solange nicht, wird in den Fahrzeug-Komponenten der
 * gestalterische Platzhalter (VehiclePlaceholder) angezeigt.
 */
export function hasVehicleImage(publicPath: string): boolean {
  return hasPublicFile(publicPath);
}
