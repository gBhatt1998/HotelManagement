import { Component, Input } from '@angular/core';
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
     
  @Input() filterCriteria: any;
  sortOrder: 'asc' | 'desc' = 'asc';

  


  // data=[list1={}]
  rooms = [
    {
      type: 'single',
      title: 'Single Room',
      description: 'A cozy single room with modern amenities, perfect for solo travelers.',
      imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24c9a',
      price: 80,
      period: 'per night'
    },
    {
      type: 'double',
      title: 'Double Room',
      description: 'Spacious double room with a king-size bed, ideal for couples.',
      imageUrl: 'https://vuniversity.in/wp-content/uploads/2023/10/Types-of-room-single.png',
      price: 120,
      period: 'per night'
    },
    {
      type: 'deluxe',
      title: 'Deluxe Suite',
      description: 'Luxurious suite with a private balcony and premium amenities.',
      imageUrl: 'https://images.unsplash.com/photo-1578683014728-c7359934f11f',
      price: 200,
      period: 'per night'
    },
    {
      type: 'family',
      title: 'Family Room',
      description: 'Large room with multiple beds, perfect for families or groups.',
      imageUrl: 'https://images.unsplash.com/photo-1618221710640-bff720b9d56c',
      price: 50,
      period: 'per night'
    },
    {
      type: 'executive',
      title: 'Executive Suite',
      description: 'Elegant suite with a workspace and high-end furnishings.',
      imageUrl: 'https://images.unsplash.com/photo-1571508601891-7a0f73631bf4',
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

}
