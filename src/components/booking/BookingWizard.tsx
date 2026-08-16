"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { SelectableCard } from "./SelectableCard";
import { StepIndicator } from "./StepIndicator";
import { PriceSummary } from "./PriceSummary";
import { getAvailableVehicles, getVehicleById } from "@/config/vehicles";
import { STANDARD_RATE_BRACKETS } from "@/config/rate-brackets";
import { EXTRAS } from "@/config/extras";
import { calculatePrice } from "@/lib/pricing";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { todayIsoDate } from "@/lib/datetime";
import type { BookingRequest, CustomerDetails } from "@/types/booking";
import type { RateBracket } from "@/types/pricing";

const STEPS = [
  { label: "Fahrzeug" },
  { label: "Mietdauer" },
  { label: "Termin" },
  { label: "Extras" },
  { label: "Kundendaten" },
  { label: "Übersicht" },
];

const EMPTY_CUSTOMER: CustomerDetails = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  street: "",
  postalCode: "",
  city: "",
  country: "Schweiz",
  dateOfBirth: "",
  licenseNumber: "",
  message: "",
};

function createInitialState(initialVehicleId?: string): BookingRequest {
  const vehicle = initialVehicleId ? getVehicleById(initialVehicleId) : undefined;
  const brackets = vehicle?.pricing.rateBrackets ?? STANDARD_RATE_BRACKETS;
  return {
    vehicleId: initialVehicleId ?? "",
    pickupDate: "",
    pickupTime: "10:00",
    bracketId: brackets[0].id,
    variantId: brackets[0].variants[0].id,
    extraIds: [],
    customer: EMPTY_CUSTOMER,
    acceptedTerms: false,
  };
}

export function BookingWizard({ initialVehicleId }: { initialVehicleId?: string }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<BookingRequest>(() => createInitialState(initialVehicleId));
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<{ id: string; total: number } | null>(null);

  const vehicle = useMemo(() => getVehicleById(form.vehicleId), [form.vehicleId]);
  const vehicles = useMemo(() => getAvailableVehicles(), []);
  const rateBrackets: RateBracket[] = vehicle?.pricing.rateBrackets ?? STANDARD_RATE_BRACKETS;

  const pricingResult = useMemo(() => {
    if (!vehicle) return null;
    return calculatePrice({
      vehicle,
      pickupDate: form.pickupDate,
      pickupTime: form.pickupTime,
      bracketId: form.bracketId,
      variantId: form.variantId,
      extraIds: form.extraIds,
    });
  }, [vehicle, form.pickupDate, form.pickupTime, form.bracketId, form.variantId, form.extraIds]);

  function update<K extends keyof BookingRequest>(key: K, value: BookingRequest[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function selectVehicle(vehicleId: string) {
    const v = getVehicleById(vehicleId);
    const brackets = v?.pricing.rateBrackets ?? STANDARD_RATE_BRACKETS;
    setForm((prev) => ({
      ...prev,
      vehicleId,
      bracketId: brackets[0].id,
      variantId: brackets[0].variants[0].id,
    }));
  }

  function selectBracketVariant(bracketId: string, variantId: string) {
    setForm((prev) => ({ ...prev, bracketId, variantId }));
  }

  function updateCustomer<K extends keyof CustomerDetails>(key: K, value: CustomerDetails[K]) {
    setForm((prev) => ({ ...prev, customer: { ...prev.customer, [key]: value } }));
  }

  function toggleExtra(id: string) {
    setForm((prev) => ({
      ...prev,
      extraIds: prev.extraIds.includes(id) ? prev.extraIds.filter((e) => e !== id) : [...prev.extraIds, id],
    }));
  }

  const stepError = useMemo((): string | null => {
    if (step === 0) {
      return vehicle ? null : "Bitte ein Fahrzeug auswählen.";
    }
    if (step === 2) {
      if (!form.pickupDate || !form.pickupTime) {
        return "Bitte Abholdatum und -zeit angeben.";
      }
      if (pricingResult && !pricingResult.ok) return pricingResult.error;
      return null;
    }
    if (step === 4) {
      const c = form.customer;
      if (!c.firstName || !c.lastName || !c.email || !c.phone || !c.street || !c.postalCode || !c.city || !c.dateOfBirth || !c.licenseNumber) {
        return "Bitte alle Pflichtfelder ausfüllen.";
      }
      if (!form.acceptedTerms) return "Bitte AGB akzeptieren, um fortzufahren.";
      return null;
    }
    return null;
  }, [step, vehicle, form, pricingResult]);

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.errors?.join(" ") ?? data.error ?? "Buchung konnte nicht gesendet werden.");
        return;
      }
      setConfirmation({ id: data.booking.id, total: data.booking.priceTotal });
    } catch {
      setSubmitError("Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.");
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmation) {
    return (
      <div className="border border-border-subtle p-10 text-center">
        <span className="text-xs uppercase tracking-[0.25em] text-accent">Anfrage gesendet</span>
        <h2 className="mt-4 text-3xl font-light text-foreground">Vielen Dank für Ihre Buchungsanfrage</h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-foreground/60">
          Ihre Referenznummer lautet <strong className="text-foreground">{confirmation.id}</strong>. Wir
          prüfen die Verfügbarkeit und melden uns innert 24 Stunden persönlich bei Ihnen zur Bestätigung.
        </p>
        <p className="mt-2 text-sm text-foreground/60">Voraussichtlicher Gesamtpreis: {formatCurrency(confirmation.total)}</p>
        <Button href="/" size="lg" className="mt-8">
          Zur Startseite
        </Button>
      </div>
    );
  }

  return (
    <div>
      <StepIndicator steps={STEPS} currentStep={step} />

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {step === 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {vehicles.map((v) => (
                <SelectableCard
                  key={v.id}
                  selected={form.vehicleId === v.id}
                  onSelect={() => selectVehicle(v.id)}
                  title={`${v.brand} ${v.model}`}
                  subtitle={`ab ${formatCurrency(Math.min(...v.pricing.rateBrackets.flatMap((b) => b.variants.map((variant) => variant.price))))}`}
                  description={v.shortDescription}
                />
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {rateBrackets.map((bracket) => (
                <div key={bracket.id} className="border border-border-subtle p-5">
                  <span className="text-sm font-medium uppercase tracking-[0.1em] text-foreground">
                    {bracket.label}
                  </span>
                  <div className="mt-3 flex flex-col gap-2">
                    {bracket.variants.map((variant) => {
                      const selected = form.bracketId === bracket.id && form.variantId === variant.id;
                      return (
                        <button
                          key={variant.id}
                          type="button"
                          onClick={() => selectBracketVariant(bracket.id, variant.id)}
                          className={`flex items-center justify-between border px-4 py-3 text-left text-sm transition-colors ${
                            selected ? "border-accent bg-surface" : "border-border-subtle hover:border-foreground/40"
                          }`}
                        >
                          <span className="text-foreground/70">{variant.label}</span>
                          <span className="text-accent">{formatCurrency(variant.price)}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <TextField
                label="Abholdatum"
                type="date"
                min={todayIsoDate()}
                value={form.pickupDate}
                onChange={(e) => update("pickupDate", e.target.value)}
              />
              <TextField
                label="Abholzeit"
                type="time"
                value={form.pickupTime}
                onChange={(e) => update("pickupTime", e.target.value)}
              />
              {pricingResult?.ok && (
                <p className="text-sm text-foreground/60 sm:col-span-2">
                  Rückgabe: {formatDateTime(pricingResult.returnAt)} Uhr ({pricingResult.breakdown.bracketLabel})
                </p>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {EXTRAS.map((extra) => (
                <SelectableCard
                  key={extra.id}
                  selected={form.extraIds.includes(extra.id)}
                  onSelect={() => toggleExtra(extra.id)}
                  title={extra.label}
                  subtitle={`${formatCurrency(extra.price)}${extra.priceType === "perDay" ? "/Tag" : ""}`}
                  description={extra.description}
                />
              ))}
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col gap-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <TextField label="Vorname" value={form.customer.firstName} onChange={(e) => updateCustomer("firstName", e.target.value)} required />
                <TextField label="Nachname" value={form.customer.lastName} onChange={(e) => updateCustomer("lastName", e.target.value)} required />
                <TextField label="E-Mail" type="email" value={form.customer.email} onChange={(e) => updateCustomer("email", e.target.value)} required />
                <TextField label="Telefon" type="tel" value={form.customer.phone} onChange={(e) => updateCustomer("phone", e.target.value)} required />
                <TextField label="Strasse & Nr." value={form.customer.street} onChange={(e) => updateCustomer("street", e.target.value)} required />
                <TextField label="PLZ" value={form.customer.postalCode} onChange={(e) => updateCustomer("postalCode", e.target.value)} required />
                <TextField label="Ort" value={form.customer.city} onChange={(e) => updateCustomer("city", e.target.value)} required />
                <TextField label="Land" value={form.customer.country} onChange={(e) => updateCustomer("country", e.target.value)} required />
                <TextField label="Geburtsdatum" type="date" value={form.customer.dateOfBirth} onChange={(e) => updateCustomer("dateOfBirth", e.target.value)} required />
                <TextField label="Führerscheinnummer" value={form.customer.licenseNumber} onChange={(e) => updateCustomer("licenseNumber", e.target.value)} required />
              </div>
              <TextField
                label="Nachricht (optional)"
                value={form.customer.message}
                onChange={(e) => updateCustomer("message", e.target.value)}
              />

              <label className="flex items-start gap-3 text-sm text-foreground/70">
                <input
                  type="checkbox"
                  checked={form.acceptedTerms}
                  onChange={(e) => update("acceptedTerms", e.target.checked)}
                  className="mt-1 h-4 w-4 accent-[var(--accent)]"
                />
                <span>
                  Ich habe die{" "}
                  <a href="/agb" target="_blank" className="text-accent underline">
                    AGB
                  </a>{" "}
                  gelesen und akzeptiere diese.
                </span>
              </label>
            </div>
          )}

          {step === 5 && vehicle && pricingResult?.ok && (
            <div className="flex flex-col gap-8">
              <div className="border border-border-subtle p-6">
                <h3 className="text-xs uppercase tracking-[0.2em] text-foreground/50">Zusammenfassung</h3>
                <dl className="mt-4 flex flex-col gap-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-foreground/60">Fahrzeug</dt>
                    <dd className="text-foreground">{vehicle.brand} {vehicle.model}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-foreground/60">Abholung</dt>
                    <dd className="text-foreground">{form.pickupDate} · {form.pickupTime} Uhr</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-foreground/60">Rückgabe</dt>
                    <dd className="text-foreground">{formatDateTime(pricingResult.returnAt)} Uhr</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-foreground/60">Mietdauer</dt>
                    <dd className="text-foreground">{pricingResult.breakdown.bracketLabel}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-foreground/60">Kilometer</dt>
                    <dd className="text-foreground">{pricingResult.breakdown.variantLabel}</dd>
                  </div>
                </dl>
              </div>

              {submitError && <p className="text-sm text-red-600">{submitError}</p>}
            </div>
          )}

          <div className="mt-10 flex items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={() => (step === 0 ? router.push("/fahrzeuge") : setStep((s) => s - 1))}
              type="button"
            >
              Zurück
            </Button>

            {step < STEPS.length - 1 ? (
              <div className="flex flex-col items-end gap-2">
                {stepError && <span className="text-xs text-red-600">{stepError}</span>}
                <Button onClick={() => setStep((s) => s + 1)} disabled={Boolean(stepError)} type="button">
                  Weiter
                </Button>
              </div>
            ) : (
              <Button onClick={handleSubmit} disabled={submitting} type="button">
                {submitting ? "Wird gesendet…" : "Buchungsanfrage senden"}
              </Button>
            )}
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 lg:h-fit">
          {pricingResult?.ok ? (
            <PriceSummary breakdown={pricingResult.breakdown} />
          ) : (
            <div className="border border-border-subtle p-6 text-sm text-foreground/50">
              Wählen Sie Fahrzeug, Mietdauer und Abholzeitpunkt, um den Preis zu berechnen.
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
