"use client";

import { useState } from "react";
import { TextField } from "@/components/ui/TextField";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.errors?.join(" ") ?? data.error ?? "Nachricht konnte nicht gesendet werden.");
        return;
      }
      setSent(true);
    } catch {
      setError("Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="border border-border-subtle p-8">
        <h2 className="text-xl font-medium text-foreground">Vielen Dank für Ihre Nachricht</h2>
        <p className="mt-2 text-sm text-foreground/60">Wir melden uns so rasch wie möglich bei Ihnen.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <TextField
        label="Name"
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        required
      />
      <TextField
        label="E-Mail"
        type="email"
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        required
      />
      <TextField
        label="Telefon (optional)"
        type="tel"
        value={form.phone}
        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
      />
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-xs uppercase tracking-[0.15em] text-foreground/60">
          Nachricht
        </label>
        <textarea
          id="message"
          rows={5}
          required
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="border border-border-subtle bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" disabled={submitting} className="self-start">
        {submitting ? "Wird gesendet…" : "Nachricht senden"}
      </Button>
    </form>
  );
}
