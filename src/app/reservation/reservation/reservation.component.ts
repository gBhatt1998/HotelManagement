import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setReservationDate } from '../store/reservation/reservation.action';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
reservationForm: FormGroup;
  minCheckOutDate: Date | null = null;

  constructor(private fb: FormBuilder) {
    this.reservationForm = this.fb.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      roomType: [null]
    
    });
  }

  filterCriteria = {
    checkIn: null as Date | null,
    checkOut: null as Date | null,
    type: ''
  };

  onSubmit() {
    if (this.reservationForm.valid) {
      this.filterCriteria = {
        checkIn: this.reservationForm.value.checkInDate,
        checkOut: this.reservationForm.value.checkOutDate,
        type: this.reservationForm.value.roomType
      };
    }
// store checkin and
    // this.store.dispatch(setReservationDate({
    //     checkIn: new Date(this.reservationForm.value.checkInDate),
    // checkOut: new Date(this.reservationForm.value.checkOutDate)
    // }))
  }

  onCheckInDateChange(): void {
    const checkInDate = this.reservationForm.get('checkInDate')?.value;
    if (checkInDate) {
      // Set minimum check-out date to the day after check-in
      this.minCheckOutDate = new Date(checkInDate);
      this.minCheckOutDate.setDate(this.minCheckOutDate.getDate() + 1);

      
    }
  }

  
}
