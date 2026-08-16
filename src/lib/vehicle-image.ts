import { existsSync } from "fs";
import { join } from "path";

/**
 * Prüft server-seitig, ob unter public/ bereits eine echte Fahrzeugdatei
 * hinterlegt wurde. Solange nicht, wird in den Fahrzeug-Komponenten der
 * gestalterische Platzhalter (VehiclePlaceholder) angezeigt.
 */
export function hasVehicleImage(publicPath: string): boolean {
  return existsSync(join(process.cwd(), "public", publicPath));
}
