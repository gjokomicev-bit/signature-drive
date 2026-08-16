import type { Booking, BookingRequest, BlockedPeriod } from "@/types/booking";

/**
 * Repository-Interfaces. Diese Abstraktion erlaubt es, die aktuelle
 * In-Memory-Implementierung (siehe memory.ts) später ohne Änderungen an
 * API-Routen oder Komponenten durch eine echte Datenbank (z.B. Prisma/Postgres)
 * zu ersetzen – einfach ein neues Modul erstellen, das dieselben Interfaces
 * implementiert, und in index.ts austauschen.
 */
export interface BookingRepository {
  create(request: BookingRequest, priceTotal: number): Promise<Booking>;
  listAll(): Promise<Booking[]>;
  listByVehicle(vehicleId: string): Promise<Booking[]>;
}

export interface BlockedPeriodRepository {
  listByVehicle(vehicleId: string): Promise<BlockedPeriod[]>;
  listAll(): Promise<BlockedPeriod[]>;
}
