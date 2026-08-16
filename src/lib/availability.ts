import { bookingRepository, blockedPeriodRepository } from "@/lib/repositories";

function rangesOverlap(startA: Date, endA: Date, startB: Date, endB: Date): boolean {
  return startA.getTime() < endB.getTime() && startB.getTime() < endA.getTime();
}

export interface AvailabilityCheckInput {
  vehicleId: string;
  pickupAt: Date;
  returnAt: Date;
}

export async function isVehicleAvailable(input: AvailabilityCheckInput): Promise<boolean> {
  if (input.returnAt <= input.pickupAt) return false;

  const [bookings, blockedPeriods] = await Promise.all([
    bookingRepository.listByVehicle(input.vehicleId),
    blockedPeriodRepository.listByVehicle(input.vehicleId),
  ]);

  const activeBookings = bookings.filter((b) => b.status !== "cancelled");

  for (const booking of activeBookings) {
    const bStart = new Date(booking.pickupAt);
    const bEnd = new Date(booking.returnAt);
    if (rangesOverlap(input.pickupAt, input.returnAt, bStart, bEnd)) {
      return false;
    }
  }

  for (const blocked of blockedPeriods) {
    const bStart = new Date(blocked.start);
    const bEnd = new Date(blocked.end);
    if (rangesOverlap(input.pickupAt, input.returnAt, bStart, bEnd)) {
      return false;
    }
  }

  return true;
}
