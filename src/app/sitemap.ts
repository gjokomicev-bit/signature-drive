import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";
import { VEHICLES } from "@/config/vehicles";

const STATIC_ROUTES = [
  "",
  "/fahrzeuge",
  "/buchung",
  "/ueber-uns",
  "/kontakt",
  "/faq",
  "/agb",
  "/datenschutz",
  "/impressum",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: new Date(),
  }));

  const vehicleEntries: MetadataRoute.Sitemap = VEHICLES.map((vehicle) => ({
    url: `${SITE.url}/fahrzeuge/${vehicle.slug}`,
    lastModified: new Date(),
  }));

  return [...staticEntries, ...vehicleEntries];
}
