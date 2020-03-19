import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { TaskDisplayComponent } from '../../src/TaskDisplay/TaskDisplay.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

export function tokengetter() {
   // get token from browser to input into the jwtModule tokenGetter, see below
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      TaskDisplayComponent
   ],
   imports: [
      CommonModule,
      BrowserModule,
      BrowserAnimationsModule,
      NgbModule,
      FormsModule,
      JwtModule.forRoot({
         config: {
            tokenGetter: tokengetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      }),
      CalendarModule.forRoot({
         provide: DateAdapter,
         useFactory: adapterFactory
      })
   ],
   exports: [TaskDisplayComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class MyModule { }