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
@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.css']
})
export class HotelCardComponent implements OnInit {
  
  hotel: Room = {
    id: 1,
    roomNumber: 101,
    type: 'Deluxe',
    // title: 'Ocean View Deluxe Suite',
    description: 'Enjoy a luxurious ocean view room with king-sized bed, minibar, and free WiFi.',
    imageUrl: 'https://vuniversity.in/wp-content/uploads/2023/10/Types-of-room-single.png',
    pricePerNight: 250,
    // period: 'per night',

  };

 availableServices: Service[] = [];
currentRoom:Room=this.hotel;
  bookingForm!: FormGroup;
  totalPrice: number = 0;
  

  constructor(private fb: FormBuilder, private store: Store<{ reservation: ReservationState }>, private hotelCardService:HotelCardService){}
  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      checkIn: [null, Validators.required],
      checkOut: [null, Validators.required],
      password: ['', [Validators.required, Validators.minLength(6),]],
        serviceIds: [[]],

    });

      this.store.select(selectCheckInDate).subscribe(checkIn => {
    if (checkIn) this.bookingForm.patchValue({ checkIn });
  });
  
  this.store.select(selectCheckOutDate).subscribe(checkOut => {
    if (checkOut) this.bookingForm.patchValue({ checkOut });
  });
  
  this.store.select(selectSelectedRoom).subscribe(room => {
    if (room) { 
      this.currentRoom = room;
        console.log(this.currentRoom);
        this.calculateTotalPrice()
    }
  });

  this.fetchAvailableServices();

  this.bookingForm.get('serviceIds')?.valueChanges.subscribe(() => {
    this.calculateTotalPrice();
  });

  this.calculateTotalPrice();
  }



  calculateTotalPrice(): void {
  const selectedServiceIds = this.bookingForm.get('serviceIds')?.value ||[] ;
  const chooseServicesTotal = this.availableServices
    .filter(service => selectedServiceIds.includes(service.id))
    .reduce((sum, service) => sum + service.price, 0);

  this.totalPrice = (this.currentRoom?.pricePerNight || 0) + chooseServicesTotal;
}

  onSubmit(): void {
  if (this.bookingForm.invalid) return;

  const formValue = this.bookingForm.value;

  const bookingPayload = {
    checkInDate: formValue.checkIn,
    checkOutDate: formValue.checkOut,
    totalPrice: this.totalPrice,
    roomId: this.currentRoom.id ,
    guestDetails: {
      name: formValue.name,
      email: formValue.email,
      password: formValue.password,
      phone: formValue.phone,
      role: 'USER'
    },
    serviceIds: formValue.serviceIds || []
  };

  console.log('Booking Payload:', bookingPayload);
}

 private fetchAvailableServices(): void {
    // this.loadingServices = true;
    this.hotelCardService.getAllServices().subscribe({
      next: (services) => {
        console.log('Available Services:', services);
        this.availableServices = services;
        // this.loadingServices = false;
        this.calculateTotalPrice(); // Recalculate after services load
      },
      error: (err) => {
        console.error('Failed to load services:', err);
        // this.loadingServices = false;
        // Consider showing an error message to the user
      }
    });
  }


}
