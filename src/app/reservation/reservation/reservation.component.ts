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
    availableRoomType: string[] = [];
selectedRoomType: string = '';

  constructor(private fb: FormBuilder, private store:Store) {
    this.reservationForm = this.fb.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      roomType: [null]
    
    });
      // this.store.subscribe(state => console.log('Entire store state:', state));

  }

  filterCriteria = {
    type: ''
  };

  onSubmit() {
    if (this.reservationForm.valid) {
      this.filterCriteria = {
        
        type: this.reservationForm.value.roomType
      };
    }
// store checkin and
    this.store.dispatch(setReservationDate({
        checkIn: new Date(this.reservationForm.value.checkInDate),
    checkOut: new Date(this.reservationForm.value.checkOutDate)
    }))
  }

  onCheckInDateChange(): void {
    const checkInDate = this.reservationForm.get('checkInDate')?.value;
    if (checkInDate) {
      // Set minimum check-out date to the day after check-in
      this.minCheckOutDate = new Date(checkInDate);
      this.minCheckOutDate.setDate(this.minCheckOutDate.getDate() + 1);

      
    }
  }


   getAllAvailableRoomTypes(types: string[]) {
    // console.log('Available Room Types:', types);
    this.availableRoomType = types;
  }
  
 onRoomTypeChange(selectedType: string) {
    
    // console.log('Selected Room Type:', selectedType);
    this.selectedRoomType = selectedType;
   this.filterCriteria.type = selectedType ?? '';
  }
  
}
