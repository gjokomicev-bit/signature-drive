"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SITE } from "@/config/site";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { href: "/fahrzeuge", label: "Fahrzeuge" },
  { href: "/aufbereitung", label: "Aufbereitung" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/faq", label: "FAQ" },
];

export function Header({ hasLogo }: { hasLogo: boolean }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showSolid = scrolled || menuOpen || pathname !== "/";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        showSolid ? "bg-ink/95 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8 lg:px-12">
        <Link href="/" className="flex flex-col items-start leading-none text-ink-foreground">
          {hasLogo ? (
            // eslint-disable-next-line @next/next/no-img-element -- statisch, vorab optimiert; next/image-Optimizer versagt bei diesem Asset
            <img src={SITE.logoPath} alt={SITE.name} className="h-14 w-auto" />
          ) : (
            <span className="text-lg font-medium uppercase tracking-[0.2em]">Signature Drive</span>
          )}
          <span className="hidden text-[10px] uppercase tracking-[0.3em] text-ink-foreground/50 sm:block">
            {SITE.region}
          </span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs uppercase tracking-[0.2em] text-ink-foreground/80 transition-colors hover:text-accent ${
                pathname === link.href ? "text-accent" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href="/buchung" size="md" invert>
            Jetzt buchen
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menü öffnen"
          aria-expanded={menuOpen}
          className="flex flex-col gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-7 bg-ink-foreground transition-transform ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span className={`h-px w-7 bg-ink-foreground transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <span
            className={`h-px w-7 bg-ink-foreground transition-transform ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-ink-foreground/10 px-6 pb-8 pt-4 md:hidden">
          <nav className="flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm uppercase tracking-[0.2em] text-ink-foreground/80 hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
            <Button href="/buchung" size="md" invert className="mt-2 w-full">
              Jetzt buchen
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
