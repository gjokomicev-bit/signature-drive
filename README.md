# Signature Drive

Premium-Vermietung von Performance- und Luxusfahrzeugen in Bern, Thun, Aargau und
Zürich. *Luxury. Performance. Experience.*

## Tech-Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4 (CSS-first Konfiguration in `src/app/globals.css`)
- Keine Datenbank-Abhängigkeit – Repository-Pattern vorbereitet für spätere DB-Anbindung

## Erste Schritte

```bash
npm install
npm run dev
```

Die Seite läuft anschliessend unter [http://localhost:3000](http://localhost:3000).

Kopiere `.env.example` nach `.env.local` und passe bei Bedarf `NEXT_PUBLIC_SITE_URL` an.

## Projektstruktur

```
src/
  app/            Next.js App-Router-Seiten & API-Routen
  components/     Wiederverwendbare UI-Komponenten (ui, layout, vehicles, booking, home, legal)
  config/         Zentrale Konfiguration: Fahrzeuge, Preise, Tarife, Zusatzleistungen, Site-Infos
  lib/            Preisberechnung, Verfügbarkeitsprüfung, Validierung, Repository-Layer
  types/          Zentrale TypeScript-Typen
```

## Preise & Fahrzeuge ändern

Sämtliche Preise, Tarife, Kilometeroptionen und Zusatzleistungen sind **zentral** in
`src/config/` hinterlegt – nirgends im UI-Code hartcodiert:

- `src/config/vehicles.ts` – Fahrzeuge, Fahrzeugdaten, Basispreise (Stunden-/Tagestarif, Kaution)
- `src/config/tariffs.ts` – Tarif-Pläne (Basic / Comfort / Exclusive) inkl. Preis-Multiplikator
- `src/config/km-options.ts` – Kilometeroptionen
- `src/config/extras.ts` – Zusatzleistungen

Um z.B. den Tagespreis des GT3 zu ändern, `pricing.dailyRate.pricePerDay` in
`src/config/vehicles.ts` anpassen. Ein neues Fahrzeug wird durch ein weiteres Objekt im
`VEHICLES`-Array ergänzt.

Die eigentliche Preisberechnung (inkl. Stunden-/Tages-/Mehrtagesmiete, Mehrtagesrabatte,
Kilometer-Zuschlag, Zusatzleistungen) läuft zentral über `src/lib/pricing.ts` und wird sowohl
im Buchungs-Wizard (Live-Vorschau) als auch serverseitig in `src/app/api/booking/route.ts`
(massgeblich) verwendet.

## Verfügbarkeit & Buchungen

Buchungen und blockierte Zeiträume werden aktuell über eine In-Memory-Referenzimplementierung
verwaltet (`src/lib/repositories/memory.ts`) – die Daten gehen bei einem Server-Neustart
verloren. Für den Produktivbetrieb die Interfaces in `src/lib/repositories/types.ts` mit einer
echten Datenbank (z.B. Prisma + Postgres) implementieren und in
`src/lib/repositories/index.ts` einbinden. Der Rest der Applikation (API-Route, Buchungs-Wizard,
Verfügbarkeitsprüfung) bleibt davon unberührt.

## Fahrzeugbilder

Es sind noch keine lizenzierten Fahrzeugfotos hinterlegt – anstelle dessen wird eine
gestalterische Platzhalterfläche (`src/components/vehicles/VehiclePlaceholder.tsx`) angezeigt.
Sobald echte Fotografie vorliegt, unter den in `src/config/vehicles.ts` hinterlegten Pfaden
(`heroImage`, `gallery`) ablegen und die Platzhalter-Komponente durch `next/image` ersetzen.

## Rechtliche Seiten

AGB, Datenschutzerklärung und Impressum (`src/app/agb`, `/datenschutz`, `/impressum`) enthalten
einen fachlich sinnvollen Entwurf, ersetzen aber keine rechtliche Prüfung. Vor dem Live-Gang
durch eine fachkundige Person (Recht/Treuhand) prüfen und die Platzhalter-Firmendaten
(Handelsregister, UID-Nummer etc.) ergänzen.

## Deployment (GitHub + Vercel)

1. Repository auf GitHub erstellen und Projekt pushen.
2. Auf [vercel.com](https://vercel.com) das GitHub-Repository importieren.
3. Umgebungsvariable `NEXT_PUBLIC_SITE_URL` in den Vercel-Projekteinstellungen setzen.
4. Jeder Push auf den Produktions-Branch löst automatisch ein Deployment aus.

## Build prüfen

```bash
npm run lint
npm run build
```
