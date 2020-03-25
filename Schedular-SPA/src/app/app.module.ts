import { TestTaskComponent } from './TestTask/TestTask.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { appRoutes } from './routes';
import { HttpClientModule } from '@angular/common/http';
import { CalendarViewComponent } from './CalendarView/CalendarView.component';


// for the ngCalendar
import {FullCalendarModule} from 'primeng/fullcalendar';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {CheckboxModule} from 'primeng/checkbox';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

export function tokengetter() {
   // get token from browser to input into the jwtModule tokenGetter, see below
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      TestTaskComponent,
      CalendarViewComponent
   ],
   imports: [
      CommonModule,
      FormsModule,
      FullCalendarModule,
      DialogModule,
      InputTextModule,
      CalendarModule,
      CheckboxModule,
      ButtonModule,
      TabViewModule,
      CodeHighlighterModule,
      CommonModule,
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      CalendarModule,
      HttpClientModule,
      NgbModule,
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
         config: {
            tokenGetter: tokengetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      }),
   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
// export class MyModule { }
