import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingCalendarComponent } from './booking-calendar/booking-calendar.component';
import { BookingBarComponent } from './booking-bar/booking-bar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookingDialogComponent } from './booking-dialog/booking-dialog.component';



@NgModule({
  declarations: [
    BookingCalendarComponent,
    BookingBarComponent,
    BookingDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule  
  ],
  exports: [BookingCalendarComponent]
})
export class BookingCalendarModule { }
