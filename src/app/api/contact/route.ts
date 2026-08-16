import { NextResponse } from "next/server";

interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: ContactRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const errors: string[] = [];
  if (!body.name?.trim()) errors.push("Name fehlt.");
  if (!body.email?.trim() || !EMAIL_REGEX.test(body.email)) errors.push("Gültige E-Mail-Adresse erforderlich.");
  if (!body.message?.trim()) errors.push("Nachricht fehlt.");

  if (errors.length > 0) {
    return NextResponse.json({ error: "Validierung fehlgeschlagen.", errors }, { status: 400 });
  }

  // Hinweis: Hier später Anbindung an E-Mail-Versand oder CRM ergänzen.
  return NextResponse.json({ success: true }, { status: 201 });
}
