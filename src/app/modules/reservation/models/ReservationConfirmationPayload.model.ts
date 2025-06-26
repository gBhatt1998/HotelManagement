export interface ReservationConfirmationPayload {
  checkInDate: string;     // e.g., '2025-06-18'
  checkOutDate: string;    // e.g., '2025-06-20'
  roomId: number;
  serviceIds: number[];
  totalPrice: number;
}
