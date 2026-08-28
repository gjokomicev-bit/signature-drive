import Link from "next/link";
import { SITE } from "@/config/site";

const NAV_COLUMNS = [
  {
    title: "Entdecken",
    links: [
      { href: "/fahrzeuge", label: "Fahrzeuge" },
      { href: "/buchung", label: "Buchung" },
      { href: "/aufbereitung", label: "Aufbereitung" },
      { href: "/ueber-uns", label: "Über uns" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      { href: "/agb", label: "AGB" },
      { href: "/datenschutz", label: "Datenschutz" },
      { href: "/impressum", label: "Impressum" },
    ],
  },
];

export function Footer({ hasLogo }: { hasLogo: boolean }) {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            {hasLogo ? (
              // eslint-disable-next-line @next/next/no-img-element -- statisch, vorab optimiert; next/image-Optimizer versagt bei diesem Asset
              <img src={SITE.logoPath} alt={SITE.name} className="h-16 w-auto" />
            ) : (
              <span className="text-lg font-medium uppercase tracking-[0.2em]">Signature Drive</span>
            )}
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-foreground/60">
              {SITE.description}
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-accent">{SITE.claim}</p>
          </div>

          {NAV_COLUMNS.map((col) => (
            <div key={col.title}>
              <span className="text-xs uppercase tracking-[0.25em] text-ink-foreground/50">{col.title}</span>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-ink-foreground/80 hover:text-accent">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-ink-foreground/50">Kontakt</span>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-ink-foreground/80">
              <li>{SITE.region}</li>
              <li>
                <a href={`tel:${SITE.contact.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                  {SITE.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.contact.email}`} className="hover:text-accent">
                  {SITE.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ink-foreground/10 pt-8 text-xs text-ink-foreground/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Signature Drive. Alle Rechte vorbehalten.</span>
          <span>{SITE.region}</span>
        </div>
      </div>
    </footer>
  );
}
