import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingCalendarComponent } from './booking-calendar/booking-calendar.component';
import { BookingBarComponent } from './booking-bar/booking-bar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookingDialogComponent } from './booking-dialog/booking-dialog.component';
import { reservationReducer } from './store/reservation.reducer';
import { StoreModule } from '@ngrx/store';
import { ReservationEffects } from './store/reservation.effects';
import { EffectsModule } from '@ngrx/effects';



@NgModule({
  declarations: [
    BookingCalendarComponent,
    BookingBarComponent,
    BookingDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule ,
    StoreModule.forFeature('calendarReservations', reservationReducer),
    EffectsModule.forFeature([ReservationEffects])

 
  ],
  exports: [BookingCalendarComponent]
})
export class BookingCalendarModule { }
