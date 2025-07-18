import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http'; 
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatDateRangeInput, MatDateRangePicker } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
// import {MatChipsModule} from '@angular/material/chips';
import { DynamicFormDialogComponent } from './components/dynamic-form-dialog/dynamic-form-dialog.component';
import { MatChipsModule } from '@angular/material/chips';

import { AddLabelDirective } from './directive/add-label.directive';
import { NgChartsModule } from 'ng2-charts';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatIconModule } from '@angular/material/icon';
import { RoomTypeFilterComponent } from './components/room-type-filter/room-type-filter.component';
import { MatMenuModule } from '@angular/material/menu';
import { ChipPopoverComponent } from './components/chip-popover/chip-popover.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DynamicCardComponent } from './components/dynamic-card/dynamic-card.component';
// import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [
    
    DialogComponent,
    DynamicTableComponent,
    DynamicFormDialogComponent,
    AddLabelDirective,
    DynamicCardComponent,
    RoomTypeFilterComponent,
    ChipPopoverComponent
  ],  
  imports: [
    CommonModule,
    MatChipsModule,
    SharedRoutingModule,
    MatNativeDateModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatPaginatorModule,
    HttpClientModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
  MatProgressSpinnerModule,
    NgChartsModule, 
    TextFieldModule,
    MatIconModule,
    MatMenuModule,
    OverlayModule,
    PortalModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatChipsModule
  
  ],
  exports:[
    MatNativeDateModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatPaginatorModule,
    HttpClientModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    DialogComponent,
    DynamicTableComponent,
    AddLabelDirective,
    DynamicCardComponent,
    MatChipsModule ,
    NgChartsModule,
    MatProgressSpinnerModule,
    RoomTypeFilterComponent,
    ChipPopoverComponent,
    MatTooltipModule  ,
    MatIconModule,
    MatDialogModule,
    MatProgressBarModule,
    MatChipsModule 
  ]
})
export class SharedModule { }
