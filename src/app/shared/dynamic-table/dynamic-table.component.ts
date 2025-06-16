import {
  Component, Input, Output, EventEmitter,
  ViewChild, OnChanges, SimpleChanges, AfterViewInit
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
// ... existing imports
@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css'],
})
export class DynamicTableComponent<T extends object> implements OnChanges, AfterViewInit {
  @Input() displayedColumns: string[] = [];
  @Input() data: T[] = [];
  @Input() showDateFilter: boolean = false;
  @Input() enableActions: boolean = true;
  @Input() enableEdit: boolean = true;
  @Input() enableRoomTypeFilter: boolean = false;

  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();

  originalData: T[] = [];
  dataSource = new MatTableDataSource<T>();

  selectedStart: Date | null = null;
  selectedEnd: Date | null = null;
  searchText: string = '';
  selectedRoomType: string = '';
  expandedServiceRowId: number | null = null;

  roomTypes: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 5;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.originalData = [...this.data];
      this.extractRoomTypes();
      this.applyFilters();
    }
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  extractRoomTypes(): void {
    const set = new Set<string>();
    this.originalData.forEach(row => {
      const type = (row as any)['roomTypeName'];
      if (type) set.add(type);
    });
    this.roomTypes = Array.from(set);
  }

  applyFilters(): void {
    let filteredData = [...this.originalData];

    // Date filter
    if (this.showDateFilter && this.selectedStart && this.selectedEnd) {
      const start = new Date(this.selectedStart);
      const end = new Date(this.selectedEnd);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);

      filteredData = filteredData.filter(row => {
        const checkIn = new Date((row as any)['checkInDate']);
        return checkIn >= start && checkIn <= end;
      });
    }

    // Search text
    if (this.searchText.trim()) {
      const text = this.searchText.trim().toLowerCase();
      filteredData = filteredData.filter(row =>
        Object.values(row).some(value =>
          String(value).toLowerCase().includes(text)
        )
      );
    }

    // Room Type filter
    if (this.selectedRoomType) {
      filteredData = filteredData.filter(row =>
        (row as any)['roomTypeName'] === this.selectedRoomType
      );
    }

    this.dataSource.data = filteredData;

    setTimeout(() => {
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
        this.paginator.firstPage();
      }
    });
  }

  clearFilters(): void {
    this.selectedStart = null;
    this.selectedEnd = null;
    this.searchText = '';
    this.selectedRoomType = '';
    this.applyFilters();
  }

  toggleService(row: T): void {
    const rowId = (row as any)['reservationId'];
    this.expandedServiceRowId = this.expandedServiceRowId === rowId ? null : rowId;
  }

  getNestedValue(obj: any, path: string): any {
  // Split the path into parts, e.g. "user.profile.name" → ["user", "profile", "name"]
  const keys = path.split('.');

  //  original object
  let current = obj;

  //  each key one by one
  for (const key of keys) {
    // if current object is not null or undefined and has the key
    if (current && current.hasOwnProperty(key)) {
      current = current[key]; // go one level deeper
    } else {
      return ''; // If   missing return empty 
    }
  }

  return current;
}

  onEdit(row: T): void {
    this.edit.emit(row);
  }

  onDelete(row: T): void {
    this.delete.emit(row);
  }

  shouldShowPaginator(): boolean {
    return this.dataSource.data.length > this.pageSize;
  }

  getPageSizeOptions(): number[] {
    const total = this.dataSource.data.length;
    if (total <= 5) return [5];
    if (total <= 10) return [5, 10];
    return [5, 10, 20];
  }
}
