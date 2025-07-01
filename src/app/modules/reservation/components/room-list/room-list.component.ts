import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { setReservationRoom } from '../../store/reservation/reservation.action';
import { RoomlistService } from '../../services/roomlist.service';
import { Subscription } from 'rxjs';
import { Room } from '../../models/room.model';
import { selectReservationState } from '../../store/reservation/reservation.selectors';
import { AppState } from '../../store/root.state'; // where your AppState interface is
import { DialogService } from 'src/app/shared/services/dialog.service';


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
  private roomInitialized = false;
  hasRoomLoadFailed = false;
  @Output() sendAllAvailableRoomTypes=new EventEmitter<string[]>();
  constructor(private roomlist: RoomlistService, private store: Store<AppState>, private dialogService: DialogService
) {}  
  

  ngOnInit() {

this.storeSub = this.store.select(selectReservationState).subscribe(state => {
      const { checkIn, checkOut } = state;
  this.checkIn = checkIn ? this.formatLocalDate(new Date(checkIn)) : null;
  this.checkOut = checkOut ? this.formatLocalDate(new Date(checkOut)) : null;


      this.fetchRooms();
    });


    const storedRoom = localStorage.getItem('selectedRoom');
  if (storedRoom && !this.roomInitialized) {
    const room: Room = JSON.parse(storedRoom);
    this.store.dispatch(setReservationRoom({ room }));
    this.roomInitialized = true;
  }

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

  private fetchRooms(): void {
    const dialogRef = this.dialogService.openLoading('Fetching available rooms...', 'Loading Rooms');

    const roomObservable = this.checkIn && this.checkOut
      ? this.roomlist.getAvailableRoomsByDate(this.checkIn, this.checkOut)
      : this.roomlist.getAllAvailableRooms();

    roomObservable.subscribe({
      next: (data: Room[]) => {
        dialogRef.close();
        this.hasRoomLoadFailed = false;

        if (data.length === 0) {
          this.hasRoomLoadFailed = true; 
        }
        if (!Array.isArray(data)) {
          this.dialogService.openError({
            title: 'Invalid Response',
            message: 'Server returned unexpected data format.',
            showRetry: true,
            onRetry: () => this.fetchRooms()
          });
          return;
        }
        this.rooms = data;
        this.availableRoomType = Array.from(new Set(data.map(room => room.type)));
        this.sendAllAvailableRoomTypes.emit(this.availableRoomType);

        if (this.rooms.length > 0 && !this.roomInitialized) {
          this.store.dispatch(setReservationRoom({ room: this.rooms[0] }));
          this.roomInitialized = true;
        }

        this.applyFilters();
      },
      error: (error) => {
        dialogRef.close(); 

        this.dialogService.openError({
          title: 'Failed to Load Rooms',
          message: error?.error?.message || 'Something went wrong while fetching rooms.',
          showRetry: true,
          onRetry: () => this.fetchRooms()
        });
      }
    });
  }


  private applyFilters() {
    // Filter
    this.filteredRooms = this.rooms.filter(room =>
      this.filterCriteria?.type
        ? room.type === this.filterCriteria.type
        : true // if no type selected, include all
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

      localStorage.setItem('selectedRoom', JSON.stringify(room));

  }

  private formatLocalDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  

}
