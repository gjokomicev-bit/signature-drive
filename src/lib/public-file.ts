import { existsSync } from "fs";
import { join } from "path";

/** Prüft server-seitig, ob unter public/ eine Datei unter dem angegebenen Pfad existiert. */
export function hasPublicFile(publicPath: string): boolean {
  return existsSync(join(process.cwd(), "public", publicPath));
}
