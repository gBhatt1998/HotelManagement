import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dynamic-card',
  templateUrl: './dynamic-card.component.html',
  styleUrls: ['./dynamic-card.component.css']
})
export class DynamicCardComponent<T = any> {
  @Input() data: T[] = [];
  @Input() fields: string[] = [];
  @Input() imageField?: string;
  @Input() enableEdit = true;
  @Input() enableDelete = true;
@Input() singleItem?: T;

  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();

  onEdit(item: T): void {
    this.edit.emit(item);
  }

  onDelete(item: T): void {
    this.delete.emit(item);
  }

  getNestedValue(obj: any, path: string): string {
    const keys = path.split('.');
    let result = obj;

    for (const key of keys) {
      if (result && key in result) {
        result = result[key];
      } else {
        return ''; 
      }
    }

    return result != null ? String(result) : '';
  }


  
}
