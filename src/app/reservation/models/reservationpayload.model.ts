export interface ReservationPayload {
  checkInDate: string; // format: 'YYYY-MM-DD'
  checkOutDate: string; // format: 'YYYY-MM-DD'
  totalPrice: number;
  roomId: number;
  guestDetails: GuestDetails;
  serviceIds: number[]; 
}

export interface GuestDetails {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string; 
}
