import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { LegalArticle } from "@/components/legal/LegalArticle";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum von Signature Drive.",
};

export default function ImpressumPage() {
  return (
    <Section tone="light" className="pt-36">
      <Eyebrow>Rechtliches</Eyebrow>
      <h1 className="mt-4 text-4xl font-light text-foreground sm:text-5xl">Impressum</h1>

      <div className="mt-16">
        <LegalArticle>
          <h2>Anbieterin</h2>
          <p>
            {SITE.name}
            <br />
            {SITE.contact.address.street}
            <br />
            {SITE.contact.address.postalCode} {SITE.contact.address.city}
            <br />
            {SITE.contact.address.country}
          </p>

          <h2>Kontakt</h2>
          <p>
            Telefon: {SITE.contact.phone}
            <br />
            E-Mail: {SITE.contact.email}
          </p>

          <h2>Haftungsausschluss</h2>
          <p>
            Alle Angaben auf dieser Website erfolgen ohne Gewähr. {SITE.name} übernimmt keine
            Haftung für die Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten
            Informationen. Für Inhalte externer, verlinkter Websites ist ausschliesslich deren
            Betreiber verantwortlich.
          </p>

          <h2>Urheberrecht</h2>
          <p>
            Alle Inhalte dieser Website, insbesondere Texte, Bilder und Grafiken, sind
            urheberrechtlich geschützt. Jede Verwendung ausserhalb der gesetzlichen Schranken
            des Urheberrechts bedarf der vorherigen schriftlichen Zustimmung von {SITE.name}.
          </p>
        </LegalArticle>
      </div>
    </Section>
  );
}
