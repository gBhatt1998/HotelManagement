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
displayedColumns: string[] = [
  'reservationId',
  'guest.name',
  'guest.email',
  'roomNumber',
  'guest.phone',         
  'roomTypeName',       
  'checkInDate',
  'checkOutDate',
  'serviceNames',
  'totalPrice'
];


  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadAllReservations());
    this.reservations$ = this.store.select(selectAllReservations);
  }

  onEdit(row: any): void {
    console.log('Edit clicked:', row);
  }

 onDelete(row: reservationdetailsresponse): void {
  this.store.dispatch(deleteReservation({ id: row.reservationId }));
}

}