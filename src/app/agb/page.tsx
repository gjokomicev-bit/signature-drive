import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { LegalArticle } from "@/components/legal/LegalArticle";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "AGB",
  description: "Allgemeine Geschäftsbedingungen von Signature Drive.",
};

export default function AgbPage() {
  return (
    <Section tone="light" className="pt-36">
      <Eyebrow>Rechtliches</Eyebrow>
      <h1 className="mt-4 text-4xl font-light text-foreground sm:text-5xl">
        Allgemeine Geschäftsbedingungen
      </h1>

      <div className="mt-16">
        <LegalArticle>
          <h2>1. Geltungsbereich</h2>
          <p>
            Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für sämtliche Mietverträge
            zwischen {SITE.name} („Vermieterin“) und ihren Kundinnen und Kunden („Mieterin“)
            über die Vermietung von Fahrzeugen der Vermieterin.
          </p>

          <h2>2. Mietvoraussetzungen</h2>
          <p>
            Die Mieterin muss das {SITE.business.minAge}. Lebensjahr vollendet haben und seit
            mindestens {SITE.business.minLicenseYears} Jahren im Besitz eines gültigen
            Führerausweises der entsprechenden Kategorie sein. Der Führerausweis sowie ein
            amtlicher Ausweis sind bei Fahrzeugübergabe im Original vorzuweisen.
          </p>

          <h2>3. Buchung und Vertragsschluss</h2>
          <p>
            Über die Website übermittelte Buchungsanfragen sind unverbindlich. Der Mietvertrag
            kommt erst mit der persönlichen Bestätigung durch die Vermieterin und der
            Unterzeichnung des Mietvertrags bei Fahrzeugübergabe zustande.
          </p>

          <h2>4. Preise, Tarife und Zahlung</h2>
          <p>
            Es gelten die zum Zeitpunkt der Buchung auf der Website angegebenen Preise, welche
            sich aus Fahrzeug, Mietdauer, gewähltem Tarif, Kilometeroption und gebuchten
            Zusatzleistungen ergeben. Der Gesamtpreis ist, sofern nicht anders vereinbart, bei
            Fahrzeugübergabe fällig.
          </p>

          <h2>5. Kilometerregelung</h2>
          <p>
            Jedem Mietvertrag liegt ein im Fahrzeug und der gewählten Kilometeroption
            definiertes Kilometerkontingent zugrunde. Mehrkilometer werden gemäss dem für das
            Fahrzeug hinterlegten Kilometerpreis in Rechnung gestellt, sofern keine unbegrenzten
            Kilometer gebucht wurden.
          </p>

          <h2>6. Versicherung und Selbstbehalt</h2>
          <p>
            Die Fahrzeuge sind vollkaskoversichert. Vorsätzlich oder grobfahrlässig verursachte
            Schäden sowie Schäden unter Einfluss von Alkohol, Drogen oder Medikamenten sind von
            der Versicherung ausgeschlossen und gehen zulasten der Mieterin.
          </p>

          <h2>7. Nutzung des Fahrzeugs</h2>
          <ul>
            <li>Das Fahrzeug darf nur von der im Mietvertrag genannten und berechtigten Person gelenkt werden.</li>
            <li>Die Teilnahme an Rennen, Fahrsicherheitstrainings auf Rennstrecken sowie die Weitervermietung sind untersagt.</li>
            <li>Das Rauchen im Fahrzeug ist nicht gestattet.</li>
            <li>Fahrten ins Ausland bedürfen der vorgängigen schriftlichen Zustimmung der Vermieterin.</li>
          </ul>

          <h2>8. Rückgabe</h2>
          <p>
            Das Fahrzeug ist zum vereinbarten Zeitpunkt, im vereinbarten Zustand und mit
            vollem Tank an die Vermieterin zurückzugeben. Bei verspäteter Rückgabe wird der
            entsprechende Tarif anteilig nachverrechnet.
          </p>

          <h2>9. Stornierung</h2>
          <p>
            Die Stornofristen richten sich nach dem gebuchten Tarif und sind auf der Website
            sowie im Mietvertrag ersichtlich. Bei Nichtantritt ohne rechtzeitige Stornierung
            kann die Vermieterin den vollen Mietpreis in Rechnung stellen.
          </p>

          <h2>10. Haftung</h2>
          <p>
            Die Vermieterin haftet nicht für indirekte Schäden oder Folgeschäden, soweit
            gesetzlich zulässig. Die Mieterin haftet für sämtliche während der Mietdauer am
            Fahrzeug entstandenen Schäden im Rahmen des vereinbarten Selbstbehalts.
          </p>

          <h2>11. Schlussbestimmungen</h2>
          <p>
            Es gilt schweizerisches Recht. Gerichtsstand ist, soweit gesetzlich zulässig, der
            Sitz der Vermieterin in {SITE.contact.address.city}.
          </p>
        </LegalArticle>
      </div>
    </Section>
  );
}
