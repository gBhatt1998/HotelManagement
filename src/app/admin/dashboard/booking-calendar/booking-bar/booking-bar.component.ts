import {
  Component,
  ElementRef,
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
      (click)="click.emit()">
      {{ booking.guestName }}
    </div>
  `,
  styleUrls: ['./booking-bar.component.css']
})
export class BookingBarComponent implements OnInit {
  @Input() booking!: Booking;
  @Input() getDayOffsets!: () => { left: number; right: number }[];

  @Output() click = new EventEmitter<void>();

  left: number = 0;
  width: number = 0;

  ngOnInit() {
    setTimeout(() => {
      const dayOffsets = this.getDayOffsets();
      const start = new Date(this.booking.startDate).getDate() - 1;
      const end = new Date(this.booking.endDate).getDate() - 1;

      if (dayOffsets[start] && dayOffsets[end]) {
        this.left = dayOffsets[start].left;
        this.width = dayOffsets[end].right - dayOffsets[start].left;
      }
    }, 0);
  }

  get tooltip() {
    return `
    Guest: ${this.booking.guestName}
    📞 ${this.booking.phoneNumber}
    Room ID: ${this.booking.roomId}
    From: ${this.booking.startDate}
    To: ${this.booking.endDate}
    💰 ₹${this.booking.totalPrice}
    `;
  }
}
