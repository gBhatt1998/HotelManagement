export interface ReservationState {
  checkIn:Date|null,
  checkOut:Date| null,
  selectedRoom:any
}

export const initalState: ReservationState={
    checkIn:null,
    checkOut:null,
    selectedRoom:null

}; 