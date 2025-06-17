import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestRoutingModule } from './guest-routing.module';
import { GuestComponent } from './guest/guest.component';
import { share } from 'rxjs';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { guestReducer } from './guest/store/guest.reducer';
import { GuestEffects } from './guest/store/guest.effects';
import { EffectsModule } from '@ngrx/effects';


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
