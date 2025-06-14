import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dynamic-card',
  templateUrl: './dynamic-card.component.html',
  styleUrls: ['./dynamic-card.component.css']
})
export class DynamicCardComponent {
  @Input() data: any[] = [];                         // Array of card data objects
  @Input() fields: string[] = [];                    // Fields to show
  @Input() imageField?: string;                      // Optional image field
  @Input() enableEdit = true;
  @Input() enableDelete = true;

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  onEdit(item: any): void {
    this.edit.emit(item);
  }

  onDelete(item: any): void {
    this.delete.emit(item);
  }

  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((o, key) => (o ? o[key] : null), obj);
  }
}
