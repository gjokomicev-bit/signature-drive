import { EMAIL_CONFIG } from "@/config/email";
import { SITE } from "@/config/site";
import { formatCurrency, formatDateTime } from "@/lib/format";
import type { Booking } from "@/types/booking";
import type { PriceBreakdown } from "@/types/pricing";
import type { Vehicle } from "@/types/vehicle";

/**
 * Sendet eine E-Mail über die Resend-REST-API (https://resend.com). Kein
 * SDK nötig, nur ein einzelner fetch-Aufruf. Ohne gesetzten
 * RESEND_API_KEY wird der Versand übersprungen und nur geloggt – die
 * Buchung selbst schlägt dadurch nie fehl.
 */
async function sendEmail(input: { to: string; subject: string; html: string }): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(`[email] RESEND_API_KEY fehlt – E-Mail nicht gesendet: "${input.subject}" an ${input.to}`);
    return;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: EMAIL_CONFIG.from,
        to: input.to,
        subject: input.subject,
        html: input.html,
      }),
    });
    if (!res.ok) {
      console.error(`[email] Versand fehlgeschlagen (${res.status}):`, await res.text());
    }
  } catch (err) {
    console.error("[email] Versand fehlgeschlagen:", err);
  }
}

function detailRows(rows: [string, string][]): string {
  return rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:6px 16px 6px 0;color:#666;white-space:nowrap;vertical-align:top;">${label}</td>
          <td style="padding:6px 0;color:#0a0a0a;">${value}</td>
        </tr>`,
    )
    .join("");
}

function buildBookingRows(booking: Booking, vehicle: Vehicle, breakdown: PriceBreakdown): [string, string][] {
  const rows: [string, string][] = [
    ["Referenz", booking.id],
    ["Fahrzeug", `${vehicle.brand} ${vehicle.model}`],
    ["Abholung", formatDateTime(new Date(booking.pickupAt))],
    ["Rückgabe", formatDateTime(new Date(booking.returnAt))],
    ["Mietdauer", breakdown.bracketLabel],
    ["Kilometer", breakdown.variantLabel],
  ];
  if (breakdown.extrasLines.length > 0) {
    rows.push(["Zusatzleistungen", breakdown.extrasLines.map((l) => l.label).join(", ")]);
  }
  if (breakdown.campaignDiscount > 0) {
    rows.push(["Alpine Signature Drive & Win", "Ja"]);
  }
  if (breakdown.voucherValid && breakdown.voucherLabel) {
    rows.push(["Gutschein", breakdown.voucherLabel]);
  }
  rows.push(["Gesamtpreis", formatCurrency(breakdown.total)]);
  return rows;
}

function emailShell(bodyHtml: string): string {
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;">
    <div style="background:#0a0a0a;padding:24px;text-align:center;">
      <span style="color:#f7f6f4;font-size:16px;letter-spacing:3px;text-transform:uppercase;">${SITE.name}</span>
    </div>
    <div style="padding:24px;border:1px solid #e4e2de;border-top:none;">
      ${bodyHtml}
    </div>
  </div>`;
}

/** Sendet die Buchungsbenachrichtigung ans Team sowie die Bestätigung an den Kunden. */
export async function sendBookingEmails(booking: Booking, vehicle: Vehicle, breakdown: PriceBreakdown): Promise<void> {
  const c = booking.request.customer;
  const rows = buildBookingRows(booking, vehicle, breakdown);

  const notificationHtml = emailShell(`
    <h2 style="margin:0 0 16px;font-size:18px;color:#0a0a0a;">Neue Buchungsanfrage</h2>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">${detailRows(rows)}</table>
    <h3 style="margin:24px 0 8px;font-size:14px;color:#0a0a0a;">Kunde</h3>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      ${detailRows([
        ["Name", `${c.firstName} ${c.lastName}`],
        ["E-Mail", c.email],
        ["Telefon", c.phone],
        ["Adresse", `${c.street}, ${c.postalCode} ${c.city}, ${c.country}`],
        ["Geburtsdatum", c.dateOfBirth],
        ...(c.message ? ([["Nachricht", c.message]] as [string, string][]) : []),
      ])}
    </table>
  `);

  const confirmationHtml = emailShell(`
    <h2 style="margin:0 0 16px;font-size:18px;color:#0a0a0a;">Vielen Dank für Ihre Buchungsanfrage</h2>
    <p style="font-size:14px;color:#0a0a0a;line-height:1.6;">
      Hallo ${c.firstName},<br /><br />
      wir haben Ihre Buchungsanfrage erhalten und prüfen die Verfügbarkeit. Wir melden uns
      innert 24 Stunden persönlich bei Ihnen zur Bestätigung.
    </p>
    <table style="width:100%;border-collapse:collapse;font-size:14px;margin-top:16px;">${detailRows(rows)}</table>
    <p style="font-size:13px;color:#666;margin-top:24px;">
      Fragen? Schreiben Sie uns jederzeit an
      <a href="mailto:${SITE.contact.email}" style="color:#b08d57;">${SITE.contact.email}</a>
      oder rufen Sie uns an: ${SITE.contact.phone}.
    </p>
  `);

  await Promise.allSettled([
    sendEmail({
      to: EMAIL_CONFIG.bookingNotificationTo,
      subject: `Neue Buchungsanfrage – ${vehicle.brand} ${vehicle.model} (${booking.id})`,
      html: notificationHtml,
    }),
    sendEmail({
      to: c.email,
      subject: `Ihre Buchungsanfrage bei ${SITE.name} (${booking.id})`,
      html: confirmationHtml,
    }),
  ]);
}
