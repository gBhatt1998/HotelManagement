export interface reservationdetailsresponse {
  reservationId: number;
  checkInDate: string; // or Date
  checkOutDate: string; // or Date
  totalPrice: number;
  roomNumber: number;
  roomTypeName: string;
  serviceNames: string[];
  guest: guestDetails;
    // canDelete: boolean; 
}

export interface guestDetails {
  // id: number;
  name: string;
  email: string;
  phone: string;
}