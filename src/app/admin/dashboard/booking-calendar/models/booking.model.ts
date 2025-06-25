export interface Booking {
  id: number;
  roomId: number;
  guestName: string;
  phoneNumber: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  serviceNames?: string[];
  roomTypeName?: string;
    canDelete: boolean; // ✅

}
