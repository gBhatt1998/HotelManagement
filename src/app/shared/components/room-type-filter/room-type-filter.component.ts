import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-room-type-filter',
  templateUrl: './room-type-filter.component.html',
  styleUrls: ['./room-type-filter.component.css'],
})
export class RoomTypeFilterComponent {
  @Input() roomTypes: string[] = [];
  @Output() roomTypeChanged = new EventEmitter<string>();

  selectedRoomType: string = '';

  onChange(): void {
    this.roomTypeChanged.emit(this.selectedRoomType);
  }

  clear(): void {
    this.selectedRoomType = '';
    this.onChange();
  }
}
