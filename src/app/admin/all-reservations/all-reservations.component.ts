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



  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadAllReservations());
    this.reservations$ = this.store.select(selectAllReservations);
  }

 

 onDelete(row: reservationdetailsresponse): void {
  this.store.dispatch(deleteReservation({ id: row.reservationId }));
}

}