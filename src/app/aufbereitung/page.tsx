import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/detailing/ServiceCard";
import { BeforeAfterSlider } from "@/components/detailing/BeforeAfterSlider";
import {
  DETAILING_SERVICES,
  BEFORE_AFTER_CATEGORIES,
  VOUCHER_TYPES,
  DETAILING_USPS,
} from "@/config/detailing";
import { SITE } from "@/config/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Fahrzeugaufbereitung",
  description:
    "Signature Detailing – professionelle Innen- und Aussenaufbereitung, Lackpolitur und Keramikversiegelung in der Region Bern.",
};

export default function AufbereitungPage() {
  const voucherLink = buildWhatsAppLink(
    SITE.contact.whatsapp,
    `Hallo ${SITE.name}, ich interessiere mich für einen Gutschein.`,
  );

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[70svh] items-end overflow-hidden bg-ink text-ink-foreground">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 75% 25%, rgba(176,141,87,0.18), transparent 45%), linear-gradient(160deg, #101012 0%, #050505 65%, #000000 100%)",
          }}
        />
        <Container className="relative pb-20 pt-40 sm:pb-28">
          <span className="text-xs uppercase tracking-[0.35em] text-accent">Signature Detailing</span>
          <h1 className="mt-6 max-w-3xl text-5xl font-light uppercase leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            Every detail matters.
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-foreground/70 sm:text-lg">
            Von der gründlichen Innen- und Aussenreinigung bis zur hochwertigen Lackaufbereitung –
            wir bringen dein Fahrzeug wieder in Bestform.
          </p>
        </Container>
      </section>

      {/* Leistungen */}
      <Section tone="light">
        <Eyebrow>Leistungen</Eyebrow>
        <h2 className="mt-4 max-w-xl text-3xl font-light text-foreground sm:text-4xl">
          Unsere Aufbereitungspakete
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DETAILING_SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Section>

      {/* Vorher / Nachher */}
      <Section tone="surface">
        <Eyebrow>Vorher / Nachher</Eyebrow>
        <h2 className="mt-4 max-w-xl text-3xl font-light text-foreground sm:text-4xl">
          The Signature Difference
        </h2>
        <p className="mt-4 max-w-xl text-sm text-foreground/60">
          Bewegen Sie den Regler, um den Unterschied zu sehen.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {BEFORE_AFTER_CATEGORIES.map((category) => (
            <BeforeAfterSlider key={category.id} label={category.label} />
          ))}
        </div>
      </Section>

      {/* Gutscheine */}
      <Section tone="dark" className="text-center">
        <Eyebrow>Erlebnis verschenken</Eyebrow>
        <h2 className="mt-4 text-3xl font-light text-ink-foreground sm:text-4xl">Give the Experience</h2>
        <p className="mx-auto mt-4 max-w-lg text-sm text-ink-foreground/60 sm:text-base">
          Gutscheine für alle, die aussergewöhnliche Fahrzeuge und höchste Pflegequalität schätzen.
        </p>

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-4 text-left sm:grid-cols-2">
          {VOUCHER_TYPES.map((voucher) => (
            <div key={voucher.id} className="border border-ink-foreground/15 p-6">
              <span className="text-sm font-medium uppercase tracking-[0.1em] text-ink-foreground">
                {voucher.label}
              </span>
              <p className="mt-2 text-sm text-ink-foreground/60">{voucher.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button href={voucherLink} target="_blank" rel="noopener noreferrer" size="lg" invert>
            Gutschein kaufen
          </Button>
        </div>
      </Section>

      {/* Warum Signature Drive */}
      <Section tone="light">
        <Eyebrow>Warum Signature Drive</Eyebrow>
        <h2 className="mt-4 max-w-xl text-3xl font-light text-foreground sm:text-4xl">More than a drive.</h2>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {DETAILING_USPS.map((usp) => (
            <div key={usp} className="border-t border-border-subtle pt-4">
              <span className="text-sm text-foreground">{usp}</span>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {["Unsere Halle", "Unsere Fahrzeuge", "Unsere Aufbereitung"].map((label) => (
            <div
              key={label}
              className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-ink"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 20%, rgba(176,141,87,0.16), transparent 55%), linear-gradient(135deg, #141416 0%, #0a0a0a 60%, #030303 100%)",
              }}
            >
              <span className="text-xs uppercase tracking-[0.3em] text-ink-foreground/50">{label}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Über uns */}
      <Section tone="surface">
        <Eyebrow>Über uns</Eyebrow>
        <h2 className="mt-4 max-w-xl text-3xl font-light text-foreground sm:text-4xl">
          Passion Meets Precision
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/60">
          Signature Drive entstand aus der Leidenschaft für aussergewöhnliche Fahrzeuge. Für uns
          endet diese Leidenschaft nicht beim Fahren. Von der Vermietung ausgewählter Sportwagen
          bis zur professionellen Fahrzeugaufbereitung steht jedes Detail im Mittelpunkt.
        </p>
      </Section>

      {/* Social Proof */}
      <Section tone="light">
        <Eyebrow>Social Media</Eyebrow>
        <h2 className="mt-4 max-w-xl text-3xl font-light text-foreground sm:text-4xl">Follow the Drive</h2>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <a
              key={index}
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex aspect-square items-center justify-center overflow-hidden bg-ink transition-opacity hover:opacity-80"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #141416 0%, #0a0a0a 60%, #030303 100%)",
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6 text-ink-foreground/40">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
            </a>
          ))}
        </div>

        <div className="mt-6">
          <Button href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" variant="ghost">
            @signaturedrive.ch auf Instagram
          </Button>
        </div>

        <div className="mt-16 border-t border-border-subtle pt-10">
          <span className="text-xs uppercase tracking-[0.25em] text-foreground/50">Google Bewertungen</span>
          <p className="mt-3 max-w-md text-sm text-foreground/60">
            Unsere Google-Bewertungen erscheinen hier, sobald genügend Rückmeldungen vorliegen.
          </p>
        </div>
      </Section>
    </>
  );
}
