import {
  Component, Input, Output, EventEmitter,
  ViewChild, OnChanges, SimpleChanges, AfterViewInit
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css']
})
export class DynamicTableComponent<T extends object> implements OnChanges, AfterViewInit {
  @Input() displayedColumns: string[] = [];
  @Input() data: T[] = [];
  @Input() showDateFilter: boolean = false;
  @Input() enableActions: boolean = true;
  @Input() serviceDropdown?: string[];
  @Input() enableEdit: boolean = true;

  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();

  originalData: T[] = [];
  dataSource = new MatTableDataSource<T>();

  selectedStart: Date | null = null;
  selectedEnd: Date | null = null;
  searchText: string = '';
  selectedService: string = '';
  expandedServiceRowId: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 5;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.originalData = [...this.data];
      this.applyFilters();
    }
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  applyFilters(): void {
    let filteredData = [...this.originalData];

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

    if (this.searchText.trim()) {
      const text = this.searchText.trim().toLowerCase();
      filteredData = filteredData.filter(row =>
        Object.values(row).some(value =>
          String(value).toLowerCase().includes(text)
        )
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

  toggleService(row: T): void {
    const rowId = (row as any)['reservationId'];
    this.expandedServiceRowId = this.expandedServiceRowId === rowId ? null : rowId;
  }
  
  getNestedValue(obj: T, path: string): unknown {
    if (!path.includes('.')) {
      return (obj as any)[path];
    }
    return path.split('.').reduce((acc, part) => acc && (acc as any)[part], obj);
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
