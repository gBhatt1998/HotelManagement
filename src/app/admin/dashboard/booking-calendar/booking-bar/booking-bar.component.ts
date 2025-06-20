import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import { Booking } from '../models/booking.model';

@Component({
  selector: 'app-booking-bar',
  template: `
<div
  class="booking-bar"
  [style.left.px]="left"
  [style.width.px]="width"
  [matTooltip]="tooltip"
  (click)="onClick($event)">
  {{ booking.guestName }}
</div>



  `,
  styleUrls: ['./booking-bar.component.css']
})
export class BookingBarComponent implements OnInit {
  @Input() booking!: Booking;
  @Input() calendarStartDate!: Date;
  @Input() totalDaysInMonth!: number;
  @Input() cellWidth: number = 40;
@Output() bookingClick = new EventEmitter<Booking>();

  // @Output() click = new EventEmitter<void>();

  left = 0;
  width = 0;

  ngOnInit() {
    this.calculateBarPosition();
  }

  private calculateBarPosition() {
    const checkIn = new Date(this.booking.startDate);
    const checkOut = new Date(this.booking.endDate);

    const startDay = checkIn.getDate();
    const endDay = checkOut.getDate();

    this.left = (startDay - 1) * this.cellWidth;
    this.width = Math.max((endDay - startDay + 1) * this.cellWidth, this.cellWidth);
  }

  get tooltip() {
    return `
Guest: ${this.booking.guestName}
📞 ${this.booking.phoneNumber}
Room: ${this.booking.roomId} (${this.booking.roomTypeName || ''})
Services: ${this.booking.serviceNames?.join(', ') || 'None'}
From: ${this.booking.startDate}
To: ${this.booking.endDate}
💰 ₹${this.booking.totalPrice}
    `;
  }

 onClick(event: MouseEvent) {
  event.stopPropagation();
  console.log('BookingBar clicked:', this.booking);
  this.bookingClick.emit(this.booking);
}


}
