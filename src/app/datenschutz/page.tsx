import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { LegalArticle } from "@/components/legal/LegalArticle";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung von Signature Drive.",
};

export default function DatenschutzPage() {
  return (
    <Section tone="light" className="pt-36">
      <Eyebrow>Rechtliches</Eyebrow>
      <h1 className="mt-4 text-4xl font-light text-foreground sm:text-5xl">Datenschutzerklärung</h1>

      <div className="mt-16">
        <LegalArticle>
          <h2>1. Verantwortliche Stelle</h2>
          <p>
            Verantwortlich für die Datenbearbeitung im Zusammenhang mit dieser Website ist{" "}
            {SITE.name}, {SITE.contact.address.street}, {SITE.contact.address.postalCode}{" "}
            {SITE.contact.address.city}, {SITE.contact.address.country}. Kontakt:{" "}
            {SITE.contact.email}.
          </p>

          <h2>2. Welche Daten wir bearbeiten</h2>
          <p>
            Im Rahmen einer Buchungsanfrage erheben wir Name, Kontaktdaten (E-Mail, Telefon),
            Adresse und Geburtsdatum sowie Angaben zum gewünschten Fahrzeug, Mietzeitraum,
            Tarif und den gewählten Zusatzleistungen. Bei einer Kontaktanfrage erheben wir Name,
            E-Mail-Adresse, optional Telefonnummer sowie den Inhalt Ihrer Nachricht.
          </p>

          <h2>3. Zweck der Bearbeitung</h2>
          <p>
            Diese Daten werden ausschliesslich zur Bearbeitung Ihrer Buchungs- bzw.
            Kontaktanfrage, zur Vertragsabwicklung sowie zur Kommunikation mit Ihnen verwendet.
            Eine Weitergabe an Dritte erfolgt nur, soweit dies zur Vertragserfüllung
            erforderlich ist (z.B. Versicherung) oder eine gesetzliche Pflicht besteht.
          </p>

          <h2>4. Aufbewahrungsdauer</h2>
          <p>
            Wir bearbeiten und speichern Ihre Personendaten nur so lange, wie dies für die
            Erfüllung der Vertragszwecke und die Einhaltung gesetzlicher Aufbewahrungsfristen
            erforderlich ist.
          </p>

          <h2>5. Cookies und Hosting</h2>
          <p>
            Diese Website verwendet ausschliesslich technisch notwendige Funktionen zum Betrieb
            der Seite. Es werden keine Marketing- oder Tracking-Cookies Dritter eingesetzt,
            sofern auf dieser Seite nicht gesondert darauf hingewiesen wird.
          </p>

          <h2>6. Ihre Rechte</h2>
          <p>
            Sie haben das Recht, Auskunft über die von uns bearbeiteten Personendaten zu
            verlangen sowie deren Berichtigung, Löschung oder Einschränkung der Bearbeitung zu
            beantragen, soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen. Wenden
            Sie sich hierzu an {SITE.contact.email}.
          </p>

          <h2>7. Datensicherheit</h2>
          <p>
            Wir treffen angemessene technische und organisatorische Massnahmen, um Ihre
            Personendaten vor unbefugtem Zugriff, Verlust oder Missbrauch zu schützen.
          </p>

          <h2>8. Änderungen</h2>
          <p>
            Wir behalten uns vor, diese Datenschutzerklärung jederzeit anzupassen, um sie an
            geänderte rechtliche Rahmenbedingungen oder Änderungen unseres Angebots anzupassen.
          </p>
        </LegalArticle>
      </div>
    </Section>
  );
}
