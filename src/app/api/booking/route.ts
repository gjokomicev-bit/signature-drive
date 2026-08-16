import { NextResponse } from "next/server";
import type { BookingRequest } from "@/types/booking";
import { validateBookingRequest } from "@/lib/validation";
import { isVehicleAvailable } from "@/lib/availability";
import { calculatePrice } from "@/lib/pricing";
import { bookingRepository } from "@/lib/repositories";
import { getVehicleById } from "@/config/vehicles";

export async function POST(request: Request) {
  let body: BookingRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const errors = validateBookingRequest(body);
  if (errors.length > 0) {
    return NextResponse.json({ error: "Validierung fehlgeschlagen.", errors }, { status: 400 });
  }

  const vehicle = getVehicleById(body.vehicleId);
  if (!vehicle || !vehicle.available) {
    return NextResponse.json({ error: "Fahrzeug ist aktuell nicht verfügbar." }, { status: 400 });
  }

  const available = await isVehicleAvailable({
    vehicleId: body.vehicleId,
    pickupDate: body.pickupDate,
    pickupTime: body.pickupTime,
    returnDate: body.returnDate,
    returnTime: body.returnTime,
  });
  if (!available) {
    return NextResponse.json(
      { error: "Das Fahrzeug ist im gewählten Zeitraum bereits gebucht." },
      { status: 409 },
    );
  }

  const pricing = calculatePrice({
    vehicle,
    pickupDate: body.pickupDate,
    pickupTime: body.pickupTime,
    returnDate: body.returnDate,
    returnTime: body.returnTime,
    tariffId: body.tariffId,
    kmOptionId: body.kmOptionId,
    extraIds: body.extraIds,
  });
  if (!pricing.ok) {
    return NextResponse.json({ error: pricing.error }, { status: 400 });
  }

  const booking = await bookingRepository.create(body, pricing.breakdown.total);

  return NextResponse.json({ booking }, { status: 201 });
}
