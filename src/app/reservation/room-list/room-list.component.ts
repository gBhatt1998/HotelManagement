import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { setReservationRoom } from '../store/reservation/reservation.action';
interface Room {
  type: string;
  title: string; description: string; imageUrl: string; price: number; period: string;
  
}
@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent {
  pageSize = 3;
  currentPage = 0;
  paginatedRooms: any[] = [];
     showPaginator = false;
  @Input() filterCriteria: any;
  sortOrder: 'asc' | 'desc' = 'asc';

  
constructor(private store: Store) {} // Inject NgRx store

  // data=[list1={}]
  rooms = [
    {
      type: 'single',
      title: 'Single Room',
      description: 'A cozy single room with modern amenities, perfect for solo travelers.',
      imageUrl: 'https://www.shutterstock.com/shutterstock/photos/737205640/display_1500/stock-photo-single-bed-room-in-the-hostel-in-seoul-korea-737205640.jpg',
      price: 80,
      period: 'per night'
    },
    {
      type: 'double',
      title: 'Double Room',
      description: 'Spacious double room with a king-size bed, ideal for couples.',
      imageUrl: 'https://www.shutterstock.com/shutterstock/photos/1684314124/display_1500/stock-photo-interior-of-a-hotel-bedroom-1684314124.jpg',
      price: 120,
      period: 'per night'
    },
    {
      type: 'deluxe',
      title: 'Deluxe Suite',
      description: 'Luxurious suite with a private balcony and premium amenities.',
      imageUrl: 'https://www.shutterstock.com/shutterstock/photos/153172712/display_1500/stock-photo-luxury-bedroom-in-hotel-153172712.jpg',
      price: 200,
      period: 'per night'
    },
    {
      type: 'family',
      title: 'Family Room',
      description: 'Large room with multiple beds, perfect for families or groups.',
      imageUrl: 'https://www.shutterstock.com/shutterstock/photos/2530906857/display_1500/stock-photo--star-hotel-everyday-hotel-tuy-hoa-city-phu-yen-province-vietnam-september-view-the-2530906857.jpg',
      price: 50,
      period: 'per night'
    },
    {
      type: 'executive',
      title: 'Executive Suite',
      description: 'Elegant suite with a workspace and high-end furnishings.',
      imageUrl: 'https://www.shutterstock.com/shutterstock/photos/2324216897/display_1500/stock-photo-dubai-united-arab-emirates-june-luxury-hotel-room-in-business-district-of-dubai-downtown-2324216897.jpg',
      price: 300,
      period: 'per night'
    }
  ];

  ngOnInit() {
    this.updatePaginatedRooms();
    this.applyFilters();
  }



  filteredRooms: Room[] = [];

 
  ngOnChanges() {
    this.applyFilters();
  }
  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedRooms();
  }

  private applyFilters() {
    // Filter
    this.filteredRooms = this.rooms.filter(room =>
      this.filterCriteria?.type ? room.type === this.filterCriteria.type : true
    );

    // Sort
    this.filteredRooms.sort((a, b) =>
      this.sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    );

    this.showPaginator=this.filteredRooms.length>this.pageSize;
    this.currentPage=0;

    this.updatePaginatedRooms();
  }

  private updatePaginatedRooms() {
    const startIndex = this.currentPage * this.pageSize;
    this.paginatedRooms = this.filteredRooms.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }

  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.applyFilters();
  }

  selectRoom(room: Room) {
    this.store.dispatch(setReservationRoom({ room }));
  }

}
