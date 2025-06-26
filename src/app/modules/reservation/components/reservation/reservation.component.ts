import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setReservationDate } from '../../store/reservation/reservation.action';
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
filterCriteria: { type: string } = { type: '' };


  constructor(private fb: FormBuilder, private store:Store) {
    this.reservationForm = this.fb.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      roomType: [null]
    
    });
      // this.store.subscribe(state => console.log('Entire store state:', state));

  }

  ngOnInit() {
  const checkIn = localStorage.getItem('checkInDate');
  const checkOut = localStorage.getItem('checkOutDate');
  const roomType = localStorage.getItem('roomType');

  if (checkIn && checkOut) {
    this.reservationForm.patchValue({
      checkInDate: new Date(checkIn),
      checkOutDate: new Date(checkOut),
      roomType: roomType || null
    });

    // Also dispatch to NgRx again
    this.store.dispatch(setReservationDate({
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut)
    }));

    this.filterCriteria.type = roomType || '';
    this.selectedRoomType = roomType || '';
  }
}




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
    }));
    localStorage.setItem('checkInDate', this.reservationForm.value.checkInDate);
    localStorage.setItem('checkOutDate', this.reservationForm.value.checkOutDate);
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
   localStorage.setItem('roomType', selectedType || '');
  }
  
}
