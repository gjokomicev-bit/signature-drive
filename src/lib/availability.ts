import { bookingRepository, blockedPeriodRepository } from "@/lib/repositories";
import { combineDateAndTime } from "@/lib/datetime";

function rangesOverlap(startA: Date, endA: Date, startB: Date, endB: Date): boolean {
  return startA.getTime() < endB.getTime() && startB.getTime() < endA.getTime();
}

export interface AvailabilityCheckInput {
  vehicleId: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
}

export async function isVehicleAvailable(input: AvailabilityCheckInput): Promise<boolean> {
  const pickup = combineDateAndTime(input.pickupDate, input.pickupTime);
  const returnAt = combineDateAndTime(input.returnDate, input.returnTime);
  if (!pickup || !returnAt || returnAt <= pickup) return false;

  const [bookings, blockedPeriods] = await Promise.all([
    bookingRepository.listByVehicle(input.vehicleId),
    blockedPeriodRepository.listByVehicle(input.vehicleId),
  ]);

  const activeBookings = bookings.filter((b) => b.status !== "cancelled");

  for (const booking of activeBookings) {
    const bStart = combineDateAndTime(booking.request.pickupDate, booking.request.pickupTime);
    const bEnd = combineDateAndTime(booking.request.returnDate, booking.request.returnTime);
    if (bStart && bEnd && rangesOverlap(pickup, returnAt, bStart, bEnd)) {
      return false;
    }
  }

  for (const blocked of blockedPeriods) {
    const bStart = new Date(blocked.start);
    const bEnd = new Date(blocked.end);
    if (rangesOverlap(pickup, returnAt, bStart, bEnd)) {
      return false;
    }
  }

  return true;
}
