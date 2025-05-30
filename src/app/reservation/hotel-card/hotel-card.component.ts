import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { selectCheckInDate, selectCheckOutDate, selectSelectedRoom } from '../store/reservation/reservation.selectors';
import { ReservationState } from '../store/reservation/reservation.state';
import { Store } from '@ngrx/store';
export interface Room {
  type: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  period: string;
}

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.css']
})
export class HotelCardComponent implements OnInit {
  
  hotel: Room = {
    type: 'Deluxe',
    title: 'Ocean View Deluxe Suite',
    description: 'Enjoy a luxurious ocean view room with king-sized bed, minibar, and free WiFi.',
    imageUrl: 'https://vuniversity.in/wp-content/uploads/2023/10/Types-of-room-single.png',
    price: 250,
    period: 'per night',
  };
currentRoom:Room=this.hotel;
  bookingForm!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<{ reservation: ReservationState }>){}
  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      checkIn: [null, Validators.required],
      checkOut: [null, Validators.required],
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
    }
  });
  }



  

  onSubmit(): void {
    if (this.bookingForm.valid) {
      const formData = {
        ...this.bookingForm.value,
        room: this.hotel
      };

  }
}}
