
export interface Booking {
    id: number;
    roomId: number;
    guestName: string;
    phoneNumber: string;
    startDate: string; // ISO date
    endDate: string;   // ISO date
    totalPrice: number;
}
  