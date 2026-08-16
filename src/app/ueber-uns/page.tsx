import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Über uns",
  description: "Signature Drive – exklusive Vermietung von Performance- und Luxusfahrzeugen in der Schweiz.",
};

const VALUES = [
  {
    title: "Kompromisslose Qualität",
    description: "Jedes Fahrzeug wird sorgfältig gepflegt, technisch geprüft und in Vollausstattung übergeben.",
  },
  {
    title: "Persönlicher Service",
    description: "Von der ersten Anfrage bis zur Rückgabe begleiten wir Sie persönlich – unkompliziert und diskret.",
  },
  {
    title: "Regionale Verwurzelung",
    description: `Zu Hause in ${SITE.region} – wir kennen die schönsten Strecken der Region und beraten Sie gerne.`,
  },
];

export default function UeberUnsPage() {
  return (
    <>
      <Section tone="light" className="pt-36">
        <Eyebrow>Über uns</Eyebrow>
        <h1 className="mt-4 max-w-2xl text-4xl font-light text-foreground sm:text-5xl">
          Fahrerlebnisse auf höchstem Niveau
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/60">
          Signature Drive wurde mit einer klaren Vision gegründet: Zugang zu aussergewöhnlichen
          Fahrzeugen so einfach, persönlich und diskret wie möglich zu gestalten. Wir richten uns
          an Menschen, die Performance und Design zu schätzen wissen – für den besonderen Anlass,
          die Passfahrt am Wochenende oder einfach, weil das Leben zu kurz ist für gewöhnliche Autos.
        </p>
      </Section>

      <Section tone="surface">
        <Eyebrow>Werte</Eyebrow>
        <div className="mt-10 grid grid-cols-1 gap-12 sm:grid-cols-3">
          {VALUES.map((value) => (
            <div key={value.title}>
              <h2 className="text-lg font-medium text-foreground">{value.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/60">{value.description}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
