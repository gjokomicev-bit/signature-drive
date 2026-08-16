import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/config/site";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink text-ink-foreground">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 75% 25%, rgba(176,141,87,0.18), transparent 45%), radial-gradient(circle at 15% 80%, rgba(255,255,255,0.06), transparent 40%), linear-gradient(160deg, #101012 0%, #050505 65%, #000000 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 80px)",
        }}
      />

      <Container className="relative pb-20 pt-40 sm:pb-28">
        <span className="text-xs uppercase tracking-[0.35em] text-accent">{SITE.region}</span>
        <h1 className="mt-6 max-w-4xl text-5xl font-light uppercase leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          {SITE.claim}
        </h1>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-foreground/70 sm:text-lg">
          Exklusive Vermietung von Performance- und Luxusfahrzeugen in der Schweiz. Handverlesene
          Modelle, kompromisslose Qualität, ein Fahrerlebnis ohne Kompromisse.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button href="/fahrzeuge" variant="solid" size="lg" invert>
            Fahrzeuge entdecken
          </Button>
          <Button href="/buchung" variant="outline" size="lg" invert>
            Jetzt buchen
          </Button>
        </div>
      </Container>
    </section>
  );
}
