import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestRoutingModule } from './guest-routing.module';
import { GuestComponent } from './components/guest/guest.component';
import { share } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { guestReducer } from './store/guest.reducer';
import { GuestEffects } from './store/guest.effects';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    GuestComponent
  ],
  imports: [
    CommonModule,
    GuestRoutingModule,
    SharedModule,
    // StoreModule.forFeature('guest', guestReducer), // ✅ reducer
    // EffectsModule.forFeature([GuestEffects])    
  ]
})
export class GuestModule { }
