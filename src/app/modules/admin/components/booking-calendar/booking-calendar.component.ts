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
import { loadFilteredReservations } from '../../store/resevation/reservation.actions';
import { selectAllReservations } from '../../store/resevation/reservation.selectors';
import { Booking } from '../../models/booking.model';
import { ReservationDetailsResponse } from '../../models/reservation-details-response.model';
// import { deleteReservation } from 'src/app/modules/admin/store/all-reservation/all-reservation.actions';  // adjust path if needed
import { Actions, ofType } from '@ngrx/effects';
// import { deleteReservationSuccess } from 'src/app/modules/admin/store/all-reservation/all-reservation.actions'; 
import { take } from 'rxjs/operators';
import { deleteReservation, deleteReservationSuccess } from '../../store/resevation/reservation.actions';

@Component({
  selector: 'app-booking-calendar',
  templateUrl: './booking-calendar.component.html',
  styleUrls: ['./booking-calendar.component.css']
})
export class BookingCalendarComponent implements OnInit, AfterViewInit {
  reservations$: Observable<ReservationDetailsResponse[]> = this.store.select(selectAllReservations);
  allBookings: ReservationDetailsResponse[] = [];
  lastClickedFilter: 'month' | 'week' | 'today' | null = null;

  dateFilter: 'today' | 'month' | 'week' = 'month';
  selectedRoomTypeId: number | null = null;
  currentMonth: Date = new Date(new Date().getFullYear(), new Date().getMonth(), 1);// June 1, 2025
  // isThisMonthView = true;
  todayDay: string = new Date().getDate().toString().padStart(2, '0');
  cellWidth = 0;
  // @Input() showRoomTypeFilter = true;
  @ViewChild('firstDayRef') firstDayRef!: ElementRef<HTMLDivElement>;
  monthDays: { label: string, isWeekend: boolean }[] = [];

  roomTypes: { id: number; type: string }[] = [];

  // { id: 101, roomNo: "101", roomTypeId: 1 }

  rooms: { id: number; roomNo: string; roomTypeId: number }[] = [];  

  hasInitializedRoomTypes = false;
  dateOptions: ('today' | 'week' | 'month')[] = ['today', 'week', 'month'];

//   roomBookings = {   101: [Booking1, Booking2], 102: [Booking3] }
  roomBookings: { [roomId: number]: Booking[] } = {};

constructor(private dialog: MatDialog, private store: Store, private actions$: Actions) { }

  ngOnInit() {
    this.generateMonthDays();
    this.loadFilteredReservationsFromStore();

    this.reservations$.subscribe(res => {

      if (!res || res.length === 0) {
        this.allBookings = [];
        if (!this.hasInitializedRoomTypes) {
          this.roomTypes = [];
        }
        this.rooms = [];
        this.roomBookings = {};
        return;
      }

      this.allBookings = res;
      this.roomBookings = {};

      // intialise room types
      if (!this.hasInitializedRoomTypes) {
        const roomTypeMap = new Map<string, number>();
        let idCounter = 1;
        res.forEach(r => {
          if (r.roomTypeName && !roomTypeMap.has(r.roomTypeName)) {
            roomTypeMap.set(r.roomTypeName, idCounter++);
          }
        });

        const allRoomTypes = Array.from(roomTypeMap.entries())
          .map(([type, id]) => ({ id, type }))
          .sort((a, b) => a.type.localeCompare(b.type)); 

        this.roomTypes = allRoomTypes;
        this.hasInitializedRoomTypes = true;
      }

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
    
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const el = this.firstDayRef?.nativeElement;
      if (el) {
        this.cellWidth = el.offsetWidth;
      } 
    }, 100);
  }

  getMonthLabel(): string {
    return this.currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  }

nextMonth() {
  this.dateFilter = 'month';
  this.lastClickedFilter = 'month';
  this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
  this.generateMonthDays();
  this.loadFilteredReservationsFromStore();
}

previousMonth() {
  this.dateFilter = 'month';
  this.lastClickedFilter = 'month';
  this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
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
onChipFilterClick(filter: 'today' | 'week' | 'month') {
  if (this.dateFilter === filter && filter === 'month') {
    this.goToCurrentMonth();
    return;
  }

  this.dateFilter = filter;
  this.lastClickedFilter = filter;
  this.currentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  this.generateMonthDays();
  this.loadFilteredReservationsFromStore();
}

goToCurrentMonth() { 
  this.currentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  this.generateMonthDays();
  this.loadFilteredReservationsFromStore();
}

getFilterLabel(filter: 'today' | 'week' | 'month'): string {
  switch (filter) {
    case 'today': return 'Today';
    case 'week': return 'This Week';
    case 'month': return 'This Month';
  }
}

getCurrentMonthLabel(): string {
  const now = new Date();
  return now.toLocaleString('default', { month: 'long', year: 'numeric' });
}

isCurrentMonthView(): boolean {
  const now = new Date();
  return (
    now.getFullYear() === this.currentMonth.getFullYear() &&
    now.getMonth() === this.currentMonth.getMonth()
  );
}





 
  isToday(label: string): boolean {
    const today = new Date();
    return (
      this.currentMonth.getFullYear() === today.getFullYear() &&
      this.currentMonth.getMonth() === today.getMonth() &&
      label === today.getDate().toString().padStart(2, '0')
    );
  }

  loadFilteredReservationsFromStore() {

    this.roomBookings = {};

    const roomTypeName = this.roomTypes.find(t => t.id === this.selectedRoomTypeId)?.type || '';
const baseDate = this.currentMonth;

    const month = baseDate.getMonth() + 1;
    const year = baseDate.getFullYear();

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

 


getBookingsForRoom(roomId: number): Booking[] {
  if (!this.roomBookings[roomId]) {
    this.roomBookings[roomId] = this.allBookings
      .filter(r => r.roomNumber === roomId)
      .map(r => this.mapReservationToBooking(r));
  }
  return this.roomBookings[roomId];
}


  openDialog(booking: Booking) {
  const dialogRef = this.dialog.open(BookingDialogComponent, { data: booking });

  dialogRef.afterClosed().subscribe(res => {
    if (res?.delete) {
this.store.dispatch(deleteReservation({ reservationId: booking.id }));

    }
  });
}


  mapReservationToBooking(r: ReservationDetailsResponse): Booking {
    return {
      id: r.reservationId,
      roomId: r.roomNumber,
      guestName: r.guest.name,
      phoneNumber: r.guest.phone,
          email: r.guest.email, 

      startDate: r.checkInDate,
      endDate: r.checkOutDate,
      totalPrice: r.totalPrice,
      serviceNames: r.serviceNames,
      roomTypeName: r.roomTypeName,
          canDelete: r.canDelete

    };
  }


  roomTypeColorMap: { [type: string]: string } = {
    'Single':'#5b6cf9',
  
  'Double': '#7373f4',
  'Executive': '#8b7bef',
  'Deluxe': '#a382ea',
  'Family':'#ba89e4',
  'Suite':'#d291df',
  'Presidental suite': '#ea98da',
  
  
  
};

getRoomTypeColor(type: string | null | undefined): string {
  return this.roomTypeColorMap[type ?? ''] || '#9E9E9E';
}

getSelectedRoomTypeBackground(): string {
  const selectedType = this.roomTypes.find(t => t.id === this.selectedRoomTypeId)?.type || '';
  return this.hexToRGBA(this.getRoomTypeColor(selectedType), 0.4);
}

hexToRGBA(hex: string, alpha: number): string {
  const bigint = parseInt(hex.replace('#', ''), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}



  
}