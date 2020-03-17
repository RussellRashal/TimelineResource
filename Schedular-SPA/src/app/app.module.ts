import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { TaskDisplayComponent } from '../../src/TaskDisplay/TaskDisplay.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

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
