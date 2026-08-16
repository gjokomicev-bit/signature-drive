import { memoryBookingRepository, memoryBlockedPeriodRepository } from "./memory";
import type { BookingRepository, BlockedPeriodRepository } from "./types";

/**
 * Einziger Ort, an dem die aktive Repository-Implementierung ausgewählt wird.
 * Für eine Datenbank-Anbindung hier die memory.ts-Implementierung durch eine
 * eigene (z.B. Prisma-basierte) ersetzen – der Rest der App bleibt unverändert.
 */
export const bookingRepository: BookingRepository = memoryBookingRepository;
export const blockedPeriodRepository: BlockedPeriodRepository = memoryBlockedPeriodRepository;

export type { BookingRepository, BlockedPeriodRepository } from "./types";
