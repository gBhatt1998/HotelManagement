import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-card',
  templateUrl: './dynamic-card.component.html',
  styleUrls: ['./dynamic-card.component.css']
})
export class DynamicCardComponent {
  @Input() title: string = '';
  @Input() data: Record<string, any> = {};
  @Input() fields: { label: string; key: string; currency?: boolean, image?: boolean }[] = [];
}
