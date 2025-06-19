import { Component } from '@angular/core';
import { deleteReservation, loadAllReservations } from '../store/all-reservation/all-reservation.actions';
import { Store } from '@ngrx/store';
import { reservationdetailsresponse } from 'src/app/shared/models/reservationdetailsresponse.model';
import { Observable } from 'rxjs';
import { selectAllReservations } from '../store/all-reservation/all-reservation.selectors';

@Component({
  selector: 'app-all-reservations',
  templateUrl: './all-reservations.component.html',
  styleUrls: ['./all-reservations.component.css']
})
export class AllReservationsComponent {
 reservations$!: Observable<reservationdetailsresponse[]>;
displayedColumns: { key: string; label: string }[] = [
  { key: 'reservationId', label: 'Reservation ID' },
  { key: 'guest.name', label: 'Guest Name' },
  { key: 'guest.email', label: 'Guest Email' },
  { key: 'guest.phone', label: 'Guest Phone' },
  { key: 'roomNumber', label: 'Room No.' },
  { key: 'roomTypeName', label: 'Room Type' },
  { key: 'checkInDate', label: 'Check-In Date' },
  { key: 'checkOutDate', label: 'Check-Out Date' },
  { key: 'serviceNames', label: 'Services' },
  { key: 'totalPrice', label: 'Total' }
];
roomTypesSet: Set<string> = new Set<string>();


  roomTypes: string[] = [];


  constructor(private store: Store) {}

ngOnInit(): void {
  this.store.dispatch(loadAllReservations({ roomType: '' }));
  this.reservations$ = this.store.select(selectAllReservations);
  
  this.reservations$.subscribe(res => {
    this.addNewRoomTypes(res);
  });
}


onRoomTypeChanged(roomType: string): void {
  this.store.dispatch(loadAllReservations({ roomType }));
  
  this.reservations$.subscribe(res => {
    this.addNewRoomTypes(res);
  });
}

addNewRoomTypes(reservations: reservationdetailsresponse[]): void {
  let updated = false;
  reservations.forEach(r => {
    if (r.roomTypeName && !this.roomTypesSet.has(r.roomTypeName)) {
      this.roomTypesSet.add(r.roomTypeName);
      updated = true;
    }
  });

  if (updated) {
    this.roomTypes = Array.from(this.roomTypesSet).sort();
  }
}



 onDelete(row: reservationdetailsresponse): void {
  this.store.dispatch(deleteReservation({ id: row.reservationId }));
}
}