export interface GuestReservationsResponse {
    guest: GuestDetails;
    reservations: ReservationSummaryDTO[];
    serviceNames: string[];
}

export interface GuestDetails {
    // id: number;
    name: string;
    email: string;
    phone: string;
    
}

export interface ReservationSummaryDTO {
    reservationId: number;
    checkInDate: string;
    checkOutDate: string;
    roomNumber: number;
    roomTypeName: string;
    totalPrice: number;
    canDelete: boolean; // ✅ already added

}
  