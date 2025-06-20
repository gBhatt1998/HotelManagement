import { Component, Input, OnInit, AfterViewInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { BookingDialogComponent } from '../booking-dialog/booking-dialog.component';
import { selectAllReservations } from 'src/app/admin/store/all-reservation/all-reservation.selectors';
import { loadAllReservations } from 'src/app/admin/store/all-reservation/all-reservation.actions';
import { reservationdetailsresponse } from 'src/app/shared/models/reservationdetailsresponse.model';

@Component({
  selector: 'app-booking-calendar',
  templateUrl: './booking-calendar.component.html',
  styleUrls: ['./booking-calendar.component.css']
})
export class BookingCalendarComponent implements OnInit, AfterViewInit {
  roomTypes = [
    { id: 1, type: 'Deluxe' },
    { id: 2, type: 'Suite' }
  ];

  rooms = [
    { id: 101, roomNo: '101', roomTypeId: 1 },
    { id: 102, roomNo: '102', roomTypeId: 1 },
    { id: 201, roomNo: '201', roomTypeId: 2 }
  ];

  reservations$: Observable<reservationdetailsresponse[]> = this.store.select(selectAllReservations);
  allBookings: reservationdetailsresponse[] = [];

  dateFilter: 'all' | 'today' | 'thisWeek' = 'all';
  selectedRoomTypeId: number | null = null;
  currentMonth: Date = new Date();
  cellWidth = 40;
  roomCellWidth = 80;
  monthDays: { label: string, isWeekend: boolean }[] = [];
  todayDay: string = new Date().getDate().toString().padStart(2, '0');
  @ViewChildren('dayRef') dayRefs!: QueryList<ElementRef<HTMLDivElement>>;

  @Input() showRoomTypeFilter = true;

  constructor(private dialog: MatDialog, private store: Store) { }

  ngOnInit() {
    this.generateMonthDays();
    this.store.dispatch(loadAllReservations({ roomType: '' }));

    this.reservations$.subscribe(res => {
      this.allBookings = res;
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const el = document.getElementById('todayCell');
      if (el) el.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }, 100);
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

  previousMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
    this.generateMonthDays();
  }

  nextMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
    this.generateMonthDays();
  }

  getMonthLabel(): string {
    return this.currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  openDialog(booking: reservationdetailsresponse) {
    const dialogRef = this.dialog.open(BookingDialogComponent, { data: booking });
    dialogRef.afterClosed().subscribe(res => {
      if (res?.delete) {
        // Optionally handle deletion locally if needed
      }
    });
  }

  onRoomTypeChange(id: number | null) {
    this.selectedRoomTypeId = id;
    const selectedRoomType = this.roomTypes.find(t => t.id === id)?.type || '';
    this.store.dispatch(loadAllReservations({ roomType: selectedRoomType }));
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
        case 'thisWeek':
          return start <= endOfWeek && end >= startOfWeek;
        default:
          return start <= monthEnd && end >= monthStart;
      }
    });
  }

  getBookingsForRoom(roomId: number): booking[] {
    return this.getFilteredBookings()
      .filter(r => r.roomNumber === roomId)
      .map(r => this.mapReservationToBooking(r));
  }
  

  getDayOffsets(): { left: number; right: number }[] {
    return this.dayRefs.map(ref => {
      const el = ref.nativeElement;
      return {
        left: el.offsetLeft,
        right: el.offsetLeft + el.offsetWidth
      };
    });
  }

  getDayOffsetFn = () => this.getDayOffsets();

  mapReservationToBooking(r: reservationdetailsresponse): Booking {
    return {
      id: r.reservationId,
      roomId: r.roomNumber,
      guestName: r.guest.name,
      phoneNumber: r.guest.phone,
      startDate: r.checkInDate,
      endDate: r.checkOutDate,
      totalPrice: r.totalPrice
    };
  }
  
}
