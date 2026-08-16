import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";

export function BrandStatement() {
  return (
    <Section tone="light" className="py-24 sm:py-32">
      <div className="max-w-3xl">
        <Eyebrow>Philosophie</Eyebrow>
        <h2 className="mt-4 text-3xl font-light leading-snug text-foreground sm:text-4xl md:text-5xl">
          Wir vermieten keine Autos. Wir eröffnen Zugang zu aussergewöhnlichen Fahrerlebnissen.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/60">
          Jedes Fahrzeug in unserer Flotte wird sorgfältig ausgewählt und in Vollausstattung
          gepflegt. Keine Kompromisse bei Zustand, Ausstattung oder Service – von der ersten
          Anfrage bis zur Rückgabe.
        </p>
      </div>
    </Section>
  );
}
