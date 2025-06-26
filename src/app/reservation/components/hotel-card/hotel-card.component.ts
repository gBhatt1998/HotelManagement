import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { selectCheckInDate, selectCheckOutDate, selectSelectedRoom } from '../../store/reservation/reservation.selectors';
import { ReservationState } from '../../store/reservation/reservation.state';
import { Store } from '@ngrx/store';
import { Room } from '../../models/room.model';
import { Service } from '../../models/service.model';
import { HotelCardService } from '../../services/hotel-card.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { AuthService } from 'src/app/auth/auth.service';
// import { GuestDetails } from '../models/reservationpayload.model';
import { GuestDetails } from 'src/app/guest/components/guest/guest.model'; // 👈 This is what the selector uses
import { selectGuestDetails } from 'src/app/guest/store/guest.selectors';
import { resetReservationDates } from '../../store/reservation/reservation.action';
@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.css']
})
export class HotelCardComponent implements OnInit {


  availableServices: Service[] = [];
  currentRoom!: Room;
  bookingForm!: FormGroup;
  totalPrice: number = 0;
  roomId!: number;
  checkInDate!: string;
  checkOutDate!: string;
submitted = false;

  previousSelectedServiceIds: number[] = [];
  selectedServices: Service[] = [];
  constructor(private fb: FormBuilder, private store: Store<{ reservation: ReservationState }>,
    private hotelCardService: HotelCardService,
    private dialogService: DialogService,
    public authService: AuthService ,
    private storeGuest:Store,
) { }


ngOnInit(): void {
  // Initialize booking form
  this.bookingForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    checkIn: [null ],
    checkOut: [null ],
    serviceIds: [[]],
  });

  // Auto-fill guest details
  this.storeGuest.select(selectGuestDetails).subscribe(guestDetails => {
    if (guestDetails && this.authService.isLoggedIn()) {
      this.bookingForm.patchValue({
        name: guestDetails.name,
        email: guestDetails.email,
        phone: guestDetails.phone,
      });
    } else {
      const stored = localStorage.getItem('guestDetails');
      if (stored) {
        const parsed = JSON.parse(stored);
        this.bookingForm.patchValue({
          name: parsed.name,
          email: parsed.email,
          phone: parsed.phone,
        });
      }
    }
  });

  // Check-in date from store (skip if null or already filled)
  this.store.select(selectCheckInDate).subscribe(checkIn => {
    if (checkIn) {
      const current = this.bookingForm.get('checkIn')?.value;
      if (!current) {
        this.bookingForm.patchValue({ checkIn: new Date(checkIn) });
      }
      this.checkInDate = this.formatLocalDate(new Date(checkIn));
      this.calculateTotalPrice();
    }
  });

  // Check-out date from store (skip if null or already filled)
  this.store.select(selectCheckOutDate).subscribe(checkOut => {
    if (checkOut) {
      const current = this.bookingForm.get('checkOut')?.value;
      if (!current) {
        this.bookingForm.patchValue({ checkOut: new Date(checkOut) });
      }
      this.checkOutDate = this.formatLocalDate(new Date(checkOut));
      this.calculateTotalPrice();
    }
  });

  // Selected room from store
  this.store.select(selectSelectedRoom).subscribe(room => {
    if (room) {
      this.currentRoom = room;
      this.roomId = room.roomNumber;
    } else {
this.currentRoom = null!;
      this.roomId = 0;
    }
    this.calculateTotalPrice();
  });

  // Fetch services
  this.fetchAvailableServices();

  // Listen for service selection changes
  this.bookingForm.get('serviceIds')?.valueChanges.subscribe((selectedIds) => {
    localStorage.setItem('selectedServiceIds', JSON.stringify(selectedIds));
    this.calculateTotalPrice();
  });

  // Restore selected services (if saved)
  const savedServiceIds = localStorage.getItem('selectedServiceIds');
  if (savedServiceIds) {
    const parsedIds = JSON.parse(savedServiceIds);
    this.bookingForm.patchValue({ serviceIds: parsedIds });
  }
}



  public calculateNights(): number {
    const checkIn = this.bookingForm.get('checkIn')?.value;
    const checkOut = this.bookingForm.get('checkOut')?.value;
    if (!checkIn || !checkOut) return 1;

    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diff = (outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60 * 24);
    return Math.max(1, Math.ceil(diff));
  }

  private fetchAvailableServices(): void {
    this.hotelCardService.getAllServices().subscribe({
      next: (services) => {
        this.availableServices = services;
      },
      error: (err) => {
        console.error('Failed to load services:', err);
        
      }
    });
  }

  public calculateTotalPrice(): void {
    const nights = this.calculateNights();
    const roomCost = (this.currentRoom?.pricePerNight || 0) * nights;

    const selectedIds = [...(this.bookingForm.get('serviceIds')?.value || [])];
    // console.log('Calculating price for service IDs:', selectedIds);

    this.selectedServices = this.availableServices.filter(s => selectedIds.includes(s.serviceId));
    const serviceCost = this.selectedServices.reduce((sum, s) => sum + s.price, 0);

    this.totalPrice = roomCost + serviceCost;
  }

  public isUserAuthenticated(): boolean {
  return this.authService.isLoggedIn();
}

onSubmit(): void {
    this.submitted = true;

  if (this.bookingForm.invalid || !this.checkInDate || !this.checkOutDate || !this.roomId) {
    this.bookingForm.markAllAsTouched();
    return;
  }
  const formValues = this.bookingForm.value;
  const formattedCheckInDate = this.formatLocalDate(new Date(formValues.checkIn));
  const formattedCheckOutDate = this.formatLocalDate(new Date(formValues.checkOut));
  
  const bookingPayload = {
    checkInDate: formattedCheckInDate,
    checkOutDate: formattedCheckOutDate,
    roomId: this.roomId,
    serviceIds: formValues.serviceIds || [],
    totalPrice: this.totalPrice
  };

console.log("Booking Payload:", JSON.stringify(bookingPayload, null, 2));

  const dialogRef = this.dialogService.openLoading('Please wait while we confirm your reservation...', 'Booking in Progress');

  this.hotelCardService.confirmReservation(bookingPayload).subscribe({
    next: (response) => {
      dialogRef.componentInstance.data = {
        title: 'Success',
        message: response.message || 'Reservation Confirmed!',
        mode: 'success',
        statusCode: response.status || 201,
        close: true,
      };
      // this.formSubmittedSuccessfully = true; // ✅ Set flag

   // ✅ Reset form fields
      this.bookingForm.reset({
        name: formValues.name, // keep guest data
        email: formValues.email,
        phone: formValues.phone,
        checkIn: null,
        checkOut: null,
        serviceIds: []
      });

      // ✅ Clear validations
      this.bookingForm.markAsPristine();
      this.bookingForm.markAsUntouched();
      this.bookingForm.updateValueAndValidity();
  this.submitted = false;

      // ✅ Cleanup
      this.selectedServices = [];
      this.totalPrice = 0;
      localStorage.removeItem('selectedServiceIds');
      localStorage.removeItem('selectedRoom');
      localStorage.removeItem('checkInDate');
      localStorage.removeItem('checkOutDate');
      this.store.dispatch(resetReservationDates());
    },
    error: (error) => {
      let errorMsg = 'An error occurred during reservation.';
      const status = error.status || 500;
      const backendResponse = error.error;

      if (status === 400 || status === 401) {
        if (typeof backendResponse === 'string') {
          errorMsg = backendResponse;
        } else if (backendResponse.message) {
          errorMsg = backendResponse.message;
        } else if (typeof backendResponse === 'object') {
          errorMsg = Object.values(backendResponse).join('\n');
        }
      }

      dialogRef.componentInstance.data = {
        title: 'Error',
        message: errorMsg,
        mode: 'error',
        statusCode: status,
        close: true,
      };
    }
  });
}

  private formatLocalDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}