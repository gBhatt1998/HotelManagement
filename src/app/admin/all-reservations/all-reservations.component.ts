import { Component } from '@angular/core';

@Component({
  selector: 'app-all-reservations',
  templateUrl: './all-reservations.component.html',
  styleUrls: ['./all-reservations.component.css']
})
export class AllReservationsComponent {
 displayedColumns: string[] = ['reservationId', 'checkInDate', 'checkOutDate', 'totalPrice', 'roomNumber', 'roomTypeName', 'guestName', 'guestPhone'];
  allReservations: any[] = []; // fetched from API
  filteredReservations: any[] = [];
selectedStart: Date | null = null;
  selectedEnd: Date | null = null;

  ngOnInit() {
    this.allReservations = this.getMockReservations();
    this.filteredReservations = [...this.allReservations];
  }

  onDateChange() {
    const start = this.selectedStart;
    const end = this.selectedEnd;

    if (start && end) {
      this.filteredReservations = this.allReservations.filter(res => {
        const checkIn = new Date(res.checkInDate);
        return checkIn >= start && checkIn <= end;
      });
    } else if (start && !end) {
      this.filteredReservations = this.allReservations.filter(res =>
        new Date(res.checkInDate).toDateString() === start.toDateString()
      );
    } else {
      this.filteredReservations = [...this.allReservations];
    }
  }

getMockReservations() {
  return [
    {
      reservationId: 1,
      checkInDate: '2025-03-01',
      checkOutDate: '2025-03-05',
      totalPrice: 1200,
      roomNumber: 101,
      roomTypeName: 'Single',
      serviceNames: ['WiFi'],
      guest: {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890'
      }
    },
    {
      reservationId: 2,
      checkInDate: '2025-03-15',
      checkOutDate: '2025-03-18',
      totalPrice: 1800,
      roomNumber: 202,
      roomTypeName: 'Double',
      serviceNames: ['WiFi', 'Breakfast'],
      guest: {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '987-654-3210'
      }
    },
    {
      reservationId: 3,
      checkInDate: '2025-04-02',
      checkOutDate: '2025-04-06',
      totalPrice: 2500,
      roomNumber: 303,
      roomTypeName: 'Suite',
      serviceNames: ['Laundry', 'Airport Shuttle'],
      guest: {
        id: 3,
        name: 'Alice Johnson',
        email: 'alice@example.com',
        phone: '555-123-4567'
      }
    },
    {
      reservationId: 4,
      checkInDate: '2025-04-10',
      checkOutDate: '2025-04-12',
      totalPrice: 1000,
      roomNumber: 104,
      roomTypeName: 'Single',
      serviceNames: [],
      guest: {
        id: 4,
        name: 'Bob Lee',
        email: 'bob@example.com',
        phone: '222-333-4444'
      }
    },
    {
      reservationId: 5,
      checkInDate: '2025-04-25',
      checkOutDate: '2025-04-28',
      totalPrice: 3000,
      roomNumber: 404,
      roomTypeName: 'Deluxe',
      serviceNames: ['Gym Access'],
      guest: {
        id: 5,
        name: 'Charlie Brown',
        email: 'charlie@example.com',
        phone: '111-222-3333'
      }
    },
    {
      reservationId: 6,
      checkInDate: '2025-05-05',
      checkOutDate: '2025-05-08',
      totalPrice: 1400,
      roomNumber: 105,
      roomTypeName: 'Single',
      serviceNames: [],
      guest: {
        id: 6,
        name: 'Diana Prince',
        email: 'diana@example.com',
        phone: '444-555-6666'
      }
    },
    {
      reservationId: 7,
      checkInDate: '2025-05-15',
      checkOutDate: '2025-05-18',
      totalPrice: 1800,
      roomNumber: 205,
      roomTypeName: 'Double',
      serviceNames: ['Breakfast', 'Spa'],
      guest: {
        id: 7,
        name: 'Ethan Hunt',
        email: 'ethan@example.com',
        phone: '777-888-9999'
      }
    },
    {
      reservationId: 8,
      checkInDate: '2025-06-01',
      checkOutDate: '2025-06-03',
      totalPrice: 2100,
      roomNumber: 306,
      roomTypeName: 'Suite',
      serviceNames: ['WiFi', 'Airport Shuttle'],
      guest: {
        id: 8,
        name: 'Grace Hopper',
        email: 'grace@example.com',
        phone: '000-111-2222'
      }
    }
  ];
}

}
