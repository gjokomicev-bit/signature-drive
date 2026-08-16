import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";

const STEPS = [
  {
    number: "01",
    title: "Fahrzeug wählen",
    description: "Wählen Sie aus unserer kuratierten Flotte an Performance- und Luxusfahrzeugen.",
  },
  {
    number: "02",
    title: "Zeitraum & Tarif festlegen",
    description: "Abholung, Rückgabe, Tarif, Kilometerpaket und Zusatzleistungen individuell konfigurieren.",
  },
  {
    number: "03",
    title: "Buchungsanfrage senden",
    description: "Persönliche Daten hinterlegen und Anfrage unverbindlich absenden.",
  },
  {
    number: "04",
    title: "Fahrerlebnis geniessen",
    description: "Wir bestätigen Ihre Buchung persönlich und übergeben das Fahrzeug fahrbereit.",
  },
];

export function ProcessSteps() {
  return (
    <Section tone="light">
      <Eyebrow>Ablauf</Eyebrow>
      <h2 className="mt-4 max-w-xl text-3xl font-light text-foreground sm:text-4xl">
        In vier Schritten zu Ihrem Fahrerlebnis
      </h2>

      <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step) => (
          <div key={step.number} className="border-t border-border-subtle pt-6">
            <span className="text-sm text-accent">{step.number}</span>
            <h3 className="mt-3 text-lg font-medium text-foreground">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/60">{step.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
