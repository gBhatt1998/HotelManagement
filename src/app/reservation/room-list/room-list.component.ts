import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { setReservationRoom } from '../store/reservation/reservation.action';
import { RoomlistService } from '../roomlist.service';
import { Subscription } from 'rxjs';
import { Room } from '../models/room.model';
import { selectReservationState } from '../store/reservation/reservation.selectors';
import { AppState } from '../store/root.state'; // where your AppState interface is

// interface Room {
//   type: string;
//   title: string; description: string; imageUrl: string; price: number; period: string;
  
// }
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
  rooms: Room[] = [];
  availableRoomType:string[] = [];
  private storeSub: Subscription | undefined;
  checkIn: string | null = null;
  checkOut: string | null = null;
  roomType: string = '';
  
  @Output() sendAllAvailableRoomTypes=new EventEmitter<string[]>();
constructor( private roomlist:RoomlistService,private store: Store<AppState>) {} // Inject NgRx store

  // data=[list1={}]
  

  ngOnInit() {

this.storeSub = this.store.select(selectReservationState).subscribe(state => {
      const { checkIn, checkOut } = state;
      this.checkIn = checkIn ? new Date(checkIn).toISOString().split('T')[0] : null;
      this.checkOut = checkOut ? new Date(checkOut).toISOString().split('T')[0] : null;

      this.fetchRooms();
    });
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

   fetchRooms(): void {
    const roomObservable = this.checkIn && this.checkOut
      ? this.roomlist.getAvailableRoomsByDate(this.checkIn, this.checkOut)
      : this.roomlist.getAllAvailableRooms();

    roomObservable.subscribe((data: Room[]) => {
      this.rooms = data;
      console.log('Available Rooms:', this.rooms);
      this.availableRoomType = Array.from(new Set(data.map(room => room.type)));
      console.log('Available Room Types:', this.availableRoomType);
          this.sendAllAvailableRoomTypes.emit(this.availableRoomType);

      this.applyFilters();
    });
  }

  private applyFilters() {
    // Filter
    this.filteredRooms = this.rooms.filter(room =>
      this.filterCriteria?.type ? room.type === this.filterCriteria.type : true
    );

    // Sort
    this.filteredRooms.sort((a, b) =>
      this.sortOrder === 'asc' ? a.pricePerNight - b.pricePerNight : b.pricePerNight - a.pricePerNight
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
