import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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

  bookingForm!: FormGroup;

  constructor(private fb: FormBuilder, ) { }

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
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
