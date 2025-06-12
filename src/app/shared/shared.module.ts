import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
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
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';
import {MatChipsModule} from '@angular/material/chips';
import { DynamicFormDialogComponent } from './dynamic-form-dialog/dynamic-form-dialog.component';

import { AddLabelDirective } from './directive/add-label.directive';

@NgModule({
  declarations: [
    NavbarComponent,
    DialogComponent,
    DynamicTableComponent,
    DynamicFormDialogComponent,
    AddLabelDirective
  ],  
  imports: [
    CommonModule,
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
  MatChipsModule
  ],
  exports:[
    NavbarComponent,
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
    AddLabelDirective
  ]
})
export class SharedModule { }
