import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { selectCheckInDate, selectCheckOutDate, selectSelectedRoom } from '../store/reservation/reservation.selectors';
import { ReservationState } from '../store/reservation/reservation.state';
import { Store } from '@ngrx/store';
import { Room } from '../models/room.model';
import { Service } from '../models/service.model';
import { HotelCardService } from '../hotel-card.service';
import { DialogService } from 'src/app/shared/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { AuthService } from 'src/app/auth/auth.service';
// import { GuestDetails } from '../models/reservationpayload.model';
import { GuestDetails } from 'src/app/guest/guest/guest.model'; // 👈 This is what the selector uses
import { selectGuestDetails } from 'src/app/guest/guest/store/guest.selectors';
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

  previousSelectedServiceIds: number[] = [];
  selectedServices: Service[] = [];
  constructor(private fb: FormBuilder, private store: Store<{ reservation: ReservationState }>,
    private hotelCardService: HotelCardService,
    private dialogService: DialogService,
    public authService: AuthService ,
    private storeGuest:Store,
) { }


  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      checkIn: [null, Validators.required],
      checkOut: [null, Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      serviceIds: [[]],
    });

    this.storeGuest.select(selectGuestDetails).subscribe((guest: GuestDetails | null) => {
      if (guest && this.isUserAuthenticated()) {
        this.bookingForm.patchValue({
          name: guest.name,
          email: guest.email,
          phone: guest.phone,
        });
      }
    });

    this.store.select(selectCheckInDate).subscribe(checkIn => {
      if (checkIn) {
        this.checkInDate = new Date(checkIn).toISOString().split('T')[0];
        this.bookingForm.patchValue({ checkIn: new Date(checkIn) });
        this.calculateTotalPrice();
      }
    });

    this.store.select(selectCheckOutDate).subscribe(checkOut => {
      if (checkOut) {
        this.checkOutDate = new Date(checkOut).toISOString().split('T')[0];
        this.bookingForm.patchValue({ checkOut: new Date(checkOut) });
        this.calculateTotalPrice();
      }
    });

    this.store.select(selectSelectedRoom).subscribe(room => {
      if (room) {
        this.currentRoom = room;
        this.roomId = room.roomNumber;
        this.calculateTotalPrice();
      }
    });

    this.fetchAvailableServices();

    this.bookingForm.get('serviceIds')?.valueChanges.subscribe(() => {
      this.calculateTotalPrice();
    });
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
    // this.loadingServices = true;
    this.hotelCardService.getAllServices().subscribe({
      next: (services) => {
        // console.log('Available Services:', services);
        this.availableServices = services;
        // this.loadingServices = false;
        // this.calculateTotalPrice(); // Recalculate after services load
      },
      error: (err) => {
        console.error('Failed to load services:', err);
        // this.loadingServices = false;
        // Consider showing an error message to the user
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
    if (this.bookingForm.invalid || !this.checkInDate || !this.checkOutDate || !this.roomId) return;

    const formValue = this.bookingForm.value;
    const formattedCheckInDate = new Date(formValue.checkIn).toISOString().split('T')[0];
    const formattedCheckOutDate = new Date(formValue.checkOut).toISOString().split('T')[0];

    const bookingPayload = {
      checkInDate: formattedCheckInDate,
      checkOutDate: formattedCheckOutDate,
      totalPrice: this.totalPrice,
      roomId: this.roomId,
      guestDetails: {
        name: formValue.name,
        email: formValue.email,
        password: formValue.password,
        phone: formValue.phone,
        role: 'USER'
      },
      serviceIds: formValue.serviceIds || []
    };

    if (this.isUserAuthenticated()) {
    bookingPayload.guestDetails = {
      name: formValue.name,
      email: formValue.email,
      password: formValue.password,
      phone: formValue.phone,
      role: 'USER'
    };
  }

    // console.log('Booking Payload:', bookingPayload);

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

        this.bookingForm.reset();
        if (this.checkInDate) {
          this.bookingForm.patchValue({ checkIn: new Date(this.checkInDate) });
        }
        if (this.checkOutDate) {
          this.bookingForm.patchValue({ checkOut: new Date(this.checkOutDate) });
        }
        this.bookingForm.patchValue({ serviceIds: [] });
        this.selectedServices = [];
      },
      error: (error) => {
        let errorMsg = 'An error occurred during reservation.';
        const status = error.status || 500;

        const backendResponse = error.error;

        // Handle 400 (Bad Request) and 401 (Unauthorized) and allow custom messages
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
  
}