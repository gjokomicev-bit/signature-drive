import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/contact/ContactForm";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontaktieren Sie Signature Drive für Fragen zu Fahrzeugen, Buchungen und individuellen Anfragen.",
};

export default function KontaktPage() {
  return (
    <Section tone="light" className="pt-36">
      <Eyebrow>Kontakt</Eyebrow>
      <h1 className="mt-4 max-w-2xl text-4xl font-light text-foreground sm:text-5xl">
        Wir sind für Sie da
      </h1>

      <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-3">
        <div className="flex flex-col gap-6 text-sm text-foreground/70">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-foreground/50">Region</span>
            <p className="mt-2">{SITE.region}</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-foreground/50">Telefon</span>
            <p className="mt-2">
              <a href={`tel:${SITE.contact.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                {SITE.contact.phone}
              </a>
            </p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-foreground/50">E-Mail</span>
            <p className="mt-2">
              <a href={`mailto:${SITE.contact.email}`} className="hover:text-accent">
                {SITE.contact.email}
              </a>
            </p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-foreground/50">Öffnungszeiten</span>
            <p className="mt-2">{SITE.business.openingHours}</p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
