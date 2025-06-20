export interface ReservationDetailsResponse {
  reservationId: number;
  checkInDate: string; // ISO date string
  checkOutDate: string;
  totalPrice: number;
  roomNumber: number;
  roomTypeName: string;
  serviceNames: string[];
  guest: GuestDetails;
}

export interface GuestDetails {
  id: number;
  name: string;
  email: string;
  phone: string;
}
