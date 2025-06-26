import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { MatChipsModule } from '@angular/material/chips';
import { GuestModule } from './modules/guest/guest.module';
import { guestReducer } from './modules/guest/store/guest.reducer';
import { GuestEffects } from './modules/guest/store/guest.effects';
import { JwtInterceptor } from './interceptor/jwt.interceptor';

// import { JwtInterceptor } from './auth/Jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),  // empty root reducer
EffectsModule.forRoot([]),
    SharedModule,
    // MatChipsModule
    // GuestModule,
     StoreModule.forFeature('guest', guestReducer), // ✅ reducer
    EffectsModule.forFeature([GuestEffects])  
  ],
  providers: [ {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
