import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { VehicleMedia } from "@/components/vehicles/VehicleMedia";
import { VehicleSpecs } from "@/components/vehicles/VehicleSpecs";
import { VEHICLES, getVehicleBySlug } from "@/config/vehicles";
import { formatCurrency } from "@/lib/format";
import { SITE } from "@/config/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { getStartingPrice } from "@/lib/pricing";

export function generateStaticParams() {
  return VEHICLES.map((vehicle) => ({ slug: vehicle.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) return {};
  return {
    title: `${vehicle.brand} ${vehicle.model}`,
    description: vehicle.shortDescription,
  };
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) notFound();

  const startingPrice = getStartingPrice(vehicle);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: `${vehicle.brand} ${vehicle.model}`,
    brand: vehicle.brand,
    model: vehicle.model,
    vehicleModelDate: String(vehicle.year),
    description: vehicle.shortDescription,
    offers: {
      "@type": "Offer",
      priceCurrency: vehicle.pricing.currency,
      price: startingPrice,
      availability: vehicle.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${SITE.url}/fahrzeuge/${vehicle.slug}`,
    },
  };

  return (
    <div className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="relative h-[70svh] min-h-[420px]">
        <VehicleMedia
          vehicle={vehicle}
          src={vehicle.heroImage}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="h-full w-full"
          label={vehicle.category}
          priority
        />
        {!vehicle.available && (
          <span className="absolute right-6 top-6 bg-ink px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-ink-foreground">
            Auf Anfrage
          </span>
        )}
      </div>

      <Container className="py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Eyebrow>{vehicle.category === "sportwagen" ? "Sportwagen" : "SUV"}</Eyebrow>
            <h1 className="mt-4 text-4xl font-light text-foreground sm:text-5xl">
              {vehicle.brand} {vehicle.model}
            </h1>
            {vehicle.variant && (
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-accent">{vehicle.variant}</p>
            )}

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-foreground/70">
              {vehicle.description}
            </p>

            <div className="mt-12">
              <h2 className="text-xs uppercase tracking-[0.25em] text-foreground/50">Highlights</h2>
              <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                {vehicle.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm text-foreground/80">
                    <span className="text-accent">—</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12">
              <h2 className="text-xs uppercase tracking-[0.25em] text-foreground/50">Technische Daten</h2>
              <div className="mt-4">
                <VehicleSpecs specs={vehicle.specs} />
              </div>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {vehicle.gallery.map((galleryImage, index) => (
                <div key={galleryImage} className="relative aspect-square overflow-hidden">
                  <VehicleMedia
                    vehicle={vehicle}
                    src={galleryImage}
                    alt={`${vehicle.brand} ${vehicle.model} – Bild ${index + 1}`}
                    className="h-full w-full"
                    label={`0${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="border border-border-subtle p-8">
              <span className="text-xs uppercase tracking-[0.25em] text-foreground/50">Ab</span>
              <p className="mt-2 text-3xl font-light text-foreground">
                {formatCurrency(startingPrice)}
              </p>

              <dl className="mt-6 flex flex-col divide-y divide-border-subtle border-y border-border-subtle text-sm">
                {vehicle.pricing.rateBrackets.map((bracket) => (
                  <div key={bracket.id} className="flex items-center justify-between py-2.5">
                    <dt className="text-foreground/60">{bracket.label}</dt>
                    <dd className="text-right text-foreground">
                      {bracket.variants.map((variant) => (
                        <span key={variant.id} className="block">
                          {formatCurrency(variant.price)}
                          <span className="text-foreground/40">
                            {" "}
                            ({variant.includedKm === "unlimited" ? "unbegrenzt" : `${variant.includedKm} km`})
                          </span>
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-xs text-foreground/50">
                Mehrkilometer {formatCurrency(vehicle.pricing.extraKmPrice)}/km
              </p>

              <Button href={`/buchung?vehicle=${vehicle.slug}`} size="lg" className="mt-8 w-full">
                Jetzt buchen
              </Button>
              <Button
                href={buildWhatsAppLink(
                  SITE.contact.whatsapp,
                  `Hallo ${SITE.name}, ich interessiere mich für den ${vehicle.brand} ${vehicle.model}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
                className="mt-3 w-full"
              >
                Anfrage per WhatsApp
              </Button>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
