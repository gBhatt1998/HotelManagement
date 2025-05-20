import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      checkOutDate: ['', Validators.required]
    });
  }

  onCheckInDateChange(): void {
    const checkInDate = this.reservationForm.get('checkInDate')?.value;
    if (checkInDate) {
      // Set minimum check-out date to the day after check-in
      this.minCheckOutDate = new Date(checkInDate);
      this.minCheckOutDate.setDate(this.minCheckOutDate.getDate() + 1);

      
    }
  }

  onSubmit(): void {
    if (this.reservationForm.valid) {
      console.log('Reservation Data:', this.reservationForm.value);
      // Handle form submission (e.g., send to backend)
    }
  }
}
