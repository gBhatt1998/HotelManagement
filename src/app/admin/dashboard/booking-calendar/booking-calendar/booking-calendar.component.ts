import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BookingDialogComponent } from '../booking-dialog/booking-dialog.component';
import { loadFilteredReservations } from '../store/reservation.actions';
import { selectAllReservations } from '../store/reservation.selectors';
import { Booking } from '../models/booking.model';
import { reservationdetailsresponse } from 'src/app/shared/models/reservationdetailsresponse.model';

@Component({
  selector: 'app-booking-calendar',
  templateUrl: './booking-calendar.component.html',
  styleUrls: ['./booking-calendar.component.css']
})
export class BookingCalendarComponent implements OnInit, AfterViewInit {
  reservations$: Observable<reservationdetailsresponse[]> = this.store.select(selectAllReservations);
  allBookings: reservationdetailsresponse[] = [];

  dateFilter: 'all' | 'today' | 'month' | 'week' = 'all';
  selectedRoomTypeId: number | null = null;
  currentMonth: Date = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  todayDay: string = new Date().getDate().toString().padStart(2, '0');
  cellWidth = 0;
  @Input() showRoomTypeFilter = true;
  @ViewChild('firstDayRef') firstDayRef!: ElementRef<HTMLDivElement>;

  roomTypes: { id: number; type: string }[] = [];
  rooms: { id: number; roomNo: string; roomTypeId: number }[] = [];

  constructor(private dialog: MatDialog, private store: Store) {}

  ngOnInit() {
    this.generateMonthDays();
    this.loadFilteredReservationsFromStore();

    this.reservations$.subscribe(res => {
      if (!res || res.length === 0) {
        this.allBookings = [];
        this.roomTypes = [];
        this.rooms = [];
        return;
      }

      this.allBookings = res;

      // Generate room types
      const roomTypeMap = new Map<string, number>();
      let idCounter = 1;
      res.forEach(r => {
        if (r.roomTypeName && !roomTypeMap.has(r.roomTypeName)) {
          roomTypeMap.set(r.roomTypeName, idCounter++);
        }
      });
      this.roomTypes = Array.from(roomTypeMap.entries()).map(([type, id]) => ({ id, type }));

      // Generate unique rooms
      const roomMap = new Map<number, { roomNo: string; roomTypeName: string }>();
      res.forEach(r => {
        if (!roomMap.has(r.roomNumber)) {
          roomMap.set(r.roomNumber, {
            roomNo: r.roomNumber.toString(),
            roomTypeName: r.roomTypeName,
          });
        }
      });

      this.rooms = Array.from(roomMap.entries()).map(([roomNumber, value]) => ({
        id: roomNumber,
        roomNo: value.roomNo,
        roomTypeId: this.roomTypes.find(t => t.type === value.roomTypeName)?.id ?? 0,
      }));
    });
    this.roomBookings = {}; // Reset cache when filters change

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const el = this.firstDayRef?.nativeElement;
      if (el) {
        this.cellWidth = el.offsetWidth;
        console.log('Cell width calculated:', this.cellWidth);
      }

      // scroll to today
      const todayCell = document.getElementById('todayCell');
      if (todayCell) {
        todayCell.scrollIntoView({ behavior: 'smooth', inline: 'center' });
      }
    }, 100);
  }

  getMonthLabel(): string {
    return this.currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  previousMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
    this.generateMonthDays();
    this.loadFilteredReservationsFromStore();
  }

  nextMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
    this.generateMonthDays();
    this.loadFilteredReservationsFromStore();
  }

  generateMonthDays() {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    this.monthDays = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const date = new Date(year, month, day);
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      return { label: day.toString().padStart(2, '0'), isWeekend };
    });
  }

  onRoomTypeChange(id: number | null) {
    this.selectedRoomTypeId = id;
    this.loadFilteredReservationsFromStore();
  }

  loadFilteredReservationsFromStore() {
    const roomTypeName = this.roomTypes.find(t => t.id === this.selectedRoomTypeId)?.type || '';
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth() + 1;

    this.store.dispatch(loadFilteredReservations({
      roomTypeName,
      dateFilter: this.dateFilter,
      month,
      year
    }));
  }

  get filteredRooms() {
    if (this.selectedRoomTypeId === null) return this.rooms;
    return this.rooms.filter(r => r.roomTypeId === this.selectedRoomTypeId);
  }

  getFilteredBookings(): reservationdetailsresponse[] {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month + 1, 0);

    return this.allBookings.filter(b => {
      const start = new Date(b.checkInDate);
      const end = new Date(b.checkOutDate);

      switch (this.dateFilter) {
        case 'today':
          return start <= today && end >= today;
        case 'week':
          return start <= endOfWeek && end >= startOfWeek;
        case 'month':
          return start <= monthEnd && end >= monthStart;
        default:
          return true;
      }
    });
  }

 roomBookings: { [roomId: number]: Booking[] } = {};

getBookingsForRoom(roomId: number): Booking[] {
  if (!this.roomBookings[roomId]) {
    this.roomBookings[roomId] = this.getFilteredBookings()
      .filter(r => r.roomNumber === roomId)
      .map(r => this.mapReservationToBooking(r));
  }
  return this.roomBookings[roomId];
}

// openDialog(booking: Booking) {
//   alert('Opening dialog');
//   this.dialog.open(BookingDialogComponent, {
//     data: booking,
//     width: '400px'
//   });
// }

  openDialog(booking: Booking) {

    const dialogRef = this.dialog.open(BookingDialogComponent, { data: booking });
    console.log('clicked');
    dialogRef.afterClosed().subscribe(res => {
      if (res?.delete) {
  setTimeout(() => this.loadFilteredReservationsFromStore(), 0);
      }
    });
  }

  mapReservationToBooking(r: reservationdetailsresponse): Booking {
    return {
      id: r.reservationId,
      roomId: r.roomNumber,
      guestName: r.guest.name,
      phoneNumber: r.guest.phone,
      startDate: r.checkInDate,
      endDate: r.checkOutDate,
      totalPrice: r.totalPrice,
      serviceNames: r.serviceNames,
      roomTypeName: r.roomTypeName
    };
  }

  monthDays: { label: string, isWeekend: boolean }[] = [];

  getRowOffsets(gridEl: ElementRef | HTMLElement) {
    return () => {
      const dayEls: HTMLElement[] = Array.from(
        (gridEl as HTMLElement).querySelectorAll('.day-cell')
      );
      return dayEls.map(el => ({
        left: el.offsetLeft,
        right: el.offsetLeft + el.offsetWidth
      }));
    };
  }
}
