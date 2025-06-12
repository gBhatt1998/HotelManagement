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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageSize = 5;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.originalData = [...this.data];
      this.applyFilters();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilters(): void {
    let filteredData = [...this.originalData];

    // Filter by date
    if (this.showDateFilter && this.selectedStart && this.selectedEnd) {
      const start = new Date(this.selectedStart);
      const end = new Date(this.selectedEnd);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);

      filteredData = filteredData.filter(row => {
        const checkIn = new Date((row as any)['checkInDate']); // you can make this stricter per use case
        return checkIn >= start && checkIn <= end;
      });
    }

    // Global search
    if (this.searchText.trim()) {
      const text = this.searchText.trim().toLowerCase();
      filteredData = filteredData.filter(row =>
        Object.values(row).some(value =>
          String(value).toLowerCase().includes(text)
        )
      );
    }

    this.dataSource.data = filteredData;

    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  getNestedValue(obj: T, path: string): unknown {
    if (!path.includes('.')) {
      return (obj as any)[path]; // handles 'id', 'roomType', etc.
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
}
