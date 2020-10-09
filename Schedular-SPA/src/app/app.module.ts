import { JwtModule } from '@auth0/angular-jwt';
// full calendar.io packages
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin

// my components
import { AppRoutingModule } from './app-routing.module';
import { CalendarViewComponent } from './CalendarView/CalendarView.component';
import { TestTaskComponent } from './TestTask/TestTask.component';
import { NavigationBarComponent } from './navigationBar/navigationBar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddTaskComponent } from './addTask/addTask.component';
import { HoursWorkedComponent } from './HoursWorked/HoursWorked.component';

// angular material
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { TimePickerComponent } from './timePicker/timePicker.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

// other angular components
import { RouterModule } from '@angular/router';
import { DatePipe, CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { appRoutes } from './routes';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UpdateTaskComponent } from './updateTask/updateTask.component';
import { LoginPageComponent } from './loginPage/loginPage.component';
import { stateStorageResolver } from './_resolvers/state-storage.resolver';
import { UserLoaderResolver } from './_resolvers/user-loader.resolver';
import { NoteComponent } from './note/note.component';
import { taskScheduleResolver } from './_resolvers/taskSchedule.resolver';
import { RegisterComponent } from './AdminConsole/register/register.component';
import { EditUsernameComponent } from './AdminConsole/editUsername/editUsername.component';
import { EditRoleComponent } from './AdminConsole/editRole/editRole.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ViewTasksComponent } from './viewTasks/viewTasks.component';



// register FullCalendar plugins
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);

// needed to send the token back to the api server for authentication
export function tokengetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [	
    AppComponent,
    NavigationBarComponent,
    CalendarViewComponent,
    TestTaskComponent,
    AddTaskComponent,
    TestTaskComponent,
    SidebarComponent,
    TimePickerComponent,
    HoursWorkedComponent,
    UpdateTaskComponent,
    LoginPageComponent,
    RegisterComponent,
    NoteComponent,
    EditUsernameComponent,
    EditRoleComponent,
    MainNavComponent,
      ViewTasksComponent
   ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    MatSidenavModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule, // register FullCalendar with you app
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config: {
         tokenGetter: tokengetter,
         whitelistedDomains: ['localhost:5000'],
         blacklistedRoutes: ['localhost:5000/api/auth']
      }
   }),
    LayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [
    UserLoaderResolver,
    stateStorageResolver,
    taskScheduleResolver,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
