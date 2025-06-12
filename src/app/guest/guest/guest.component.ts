import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import * as GuestActions from '../guest/store/guest.actions';
import { GuestDetails, ReservationSummaryDTO } from './guest.model';
import { selectGuestReservations, selectGuestState } from './store/guest.selectors';
import { HotelCardService } from 'src/app/reservation/hotel-card.service';
import { Service } from 'src/app/reservation/models/service.model';

@Component({
  selector: 'app-guest-reservations',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {
  reservations$: Observable<ReservationSummaryDTO[]> = this.store.select(selectGuestReservations);
  guest$: Observable<GuestDetails>;
  serviceDropdown$: Observable<string[]>;

  allServices: Service[] = [];
  selectedServiceDetails: Service[] = [];

  columns = ['reservationId', 'checkInDate', 'checkOutDate', 'roomNumber', 'roomTypeName', 'totalPrice'];

  constructor(private store: Store, private hotelCardService: HotelCardService) {
    const guestState$ = this.store.select(selectGuestState);
    this.guest$ = guestState$.pipe(map(state => state.data?.guest!));
    this.serviceDropdown$ = guestState$.pipe(map(state => state.data?.serviceNames || []));
  }

  ngOnInit(): void {
    this.store.dispatch(GuestActions.loadGuestReservations());

    this.hotelCardService.getAllServices().subscribe((services) => {
      this.allServices = services;

      this.serviceDropdown$.subscribe((selectedNames) => {
        this.selectedServiceDetails = this.allServices.filter(service =>
          selectedNames.includes(service.name)
        );
      });
    });
  }

  onDelete(id: number): void {
    this.store.dispatch(GuestActions.deleteGuestReservation({ id }));
  }
}
