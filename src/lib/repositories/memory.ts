import type { Booking, BookingRequest, BlockedPeriod } from "@/types/booking";
import type { BookingRepository, BlockedPeriodRepository } from "./types";

/**
 * In-Memory-Referenzimplementierung für die lokale Entwicklung und Demo.
 * Daten gehen bei jedem Server-Neustart verloren – für den Produktivbetrieb
 * durch eine echte Datenbank-Anbindung ersetzen (Interface siehe types.ts).
 *
 * Der Store hängt an `globalThis`, damit er den Hot-Reload des Next.js
 * Dev-Servers übersteht (gleiches Muster wie beim Prisma-Client-Singleton).
 */
interface MemoryStore {
  bookings: Booking[];
  blockedPeriods: BlockedPeriod[];
}

const globalForStore = globalThis as unknown as { __sdMemoryStore?: MemoryStore };

const store: MemoryStore =
  globalForStore.__sdMemoryStore ??
  (globalForStore.__sdMemoryStore = {
    bookings: [],
    blockedPeriods: [],
  });

let bookingCounter = store.bookings.length;

export const memoryBookingRepository: BookingRepository = {
  async create(request: BookingRequest, priceTotal: number): Promise<Booking> {
    bookingCounter += 1;
    const booking: Booking = {
      id: `SD-${Date.now().toString(36).toUpperCase()}-${bookingCounter}`,
      status: "pending",
      createdAt: new Date().toISOString(),
      request,
      priceTotal,
      currency: "CHF",
    };
    store.bookings.push(booking);
    return booking;
  },
  async listAll(): Promise<Booking[]> {
    return store.bookings;
  },
  async listByVehicle(vehicleId: string): Promise<Booking[]> {
    return store.bookings.filter((b) => b.request.vehicleId === vehicleId);
  },
};

export const memoryBlockedPeriodRepository: BlockedPeriodRepository = {
  async listByVehicle(vehicleId: string): Promise<BlockedPeriod[]> {
    return store.blockedPeriods.filter((b) => b.vehicleId === vehicleId);
  },
  async listAll(): Promise<BlockedPeriod[]> {
    return store.blockedPeriods;
  },
};
