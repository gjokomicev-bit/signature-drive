import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SITE } from "@/config/site";

export function CtaSection() {
  return (
    <Section tone="dark" className="text-center">
      <span className="text-xs uppercase tracking-[0.35em] text-accent">{SITE.claim}</span>
      <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-light text-ink-foreground sm:text-4xl md:text-5xl">
        Bereit für Ihr nächstes Fahrerlebnis?
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-sm text-ink-foreground/60 sm:text-base">
        Sichern Sie sich Ihr Wunschfahrzeug in Bern, Thun, Aargau oder Zürich.
      </p>
      <div className="mt-10 flex justify-center">
        <Button href="/buchung" size="lg" invert>
          Jetzt buchen
        </Button>
      </div>
    </Section>
  );
}
