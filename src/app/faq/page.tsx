import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Häufig gestellte Fragen zur Fahrzeugmiete bei Signature Drive.",
};

const FAQS = [
  {
    question: "Welches Mindestalter gilt für die Anmietung?",
    answer: `Das Mindestalter beträgt ${SITE.business.minAge} Jahre. Zudem wird ein Führerausweis vorausgesetzt, der seit mindestens ${SITE.business.minLicenseYears} Jahren gültig ist.`,
  },
  {
    question: "Was ist im Mietpreis inklusive?",
    answer:
      "Der Mietpreis beinhaltet Vollkaskoversicherung sowie das beim gewählten Mietdauer-Paket hinterlegte Kilometerkontingent. Zusatzleistungen wie Lieferservice oder Zusatzfahrer können individuell hinzugebucht werden.",
  },
  {
    question: "Kann ich das Fahrzeug ausserhalb der Region abholen lassen?",
    answer:
      "Gerne liefern wir Ihr Fahrzeug gegen Aufpreis an einen Wunschort in der Region Bern, Thun, Aargau oder Zürich. Kontaktieren Sie uns für individuelle Anfragen.",
  },
  {
    question: "Wie kann ich eine Buchung stornieren?",
    answer:
      "Die Stornofristen richten sich nach dem gewählten Tarif (siehe AGB). Bitte kontaktieren Sie uns frühzeitig, damit wir eine für Sie passende Lösung finden.",
  },
  {
    question: "Ist eine Buchungsanfrage bereits verbindlich?",
    answer:
      "Eine über die Website gesendete Buchungsanfrage ist zunächst unverbindlich. Wir prüfen die Verfügbarkeit und bestätigen Ihre Buchung persönlich innert 24 Stunden.",
  },
];

export default function FaqPage() {
  return (
    <Section tone="light" className="pt-36">
      <Eyebrow>FAQ</Eyebrow>
      <h1 className="mt-4 max-w-2xl text-4xl font-light text-foreground sm:text-5xl">
        Häufig gestellte Fragen
      </h1>

      <div className="mt-16 divide-y divide-border-subtle border-t border-border-subtle">
        {FAQS.map((faq) => (
          <details key={faq.question} className="group py-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-medium text-foreground">
              {faq.question}
              <span className="text-accent transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/60">{faq.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
