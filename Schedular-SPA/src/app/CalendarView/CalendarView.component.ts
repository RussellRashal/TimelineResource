import { StateStorageService } from './../_services/stateStorage.service';
import { AuthService } from './../_services/auth.service';
import { TaskSchedule } from './../_models/taskSchedule';
import { Component, OnInit, Inject } from '@angular/core';
import { CalendarOptions, Calendar } from '@fullcalendar/angular'; // useful for typechecking
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { TaskScheduleService } from '../_services/taskSchedule.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UpdateTaskComponent } from '../updateTask/updateTask.component';

import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddTaskComponent } from '../addTask/addTask.component';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-calendarview',
  templateUrl: './CalendarView.component.html',
  styleUrls: ['./CalendarView.component.scss']
})
export class CalendarViewComponent implements OnInit {
  apiEvents: any[];
  currentUserLoggedIn;
  selectedFullNameStaff;
  testTaskSchedule;
  currentStaffSelected;


  calendarOptions: CalendarOptions = {
    plugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'timeGridWeek',
    headerToolbar: {
      left: 'prev,next', // to switch between month, week and day
      center: 'title', // to show what month it's currently on
      right: 'dayGridMonth,timeGridWeek,timeGridDay' // buttons for switching between views
    },
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [],
  };


  constructor(
    private taskScheduleService: TaskScheduleService,
    private authService: AuthService,
    private stateStorageService: StateStorageService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.currentStaffSelected = JSON.parse(localStorage.getItem('staff'));
    this.runCalendarData(this.currentStaffSelected);
  }

  runCalendarData(staff) {
    this.currentStaffSelected = staff;
    this.stateStorageService.setClickedOnStaffMember(staff);
    this.selectedFullNameStaff = staff.firstName + ' ' + staff.lastName;
    this.taskScheduleService.getTaskScheduleByStaffId(staff.id).subscribe((data) => {
      this.apiEvents = data;
      this.calendar(this.apiEvents);
    });

  }

  CalendarData(staffId) {
    this.taskScheduleService.getTaskScheduleByStaffId(staffId).subscribe((data) => {
      this.apiEvents = data;
      this.calendar(this.apiEvents);
    });
  }

  calendar(apiEvents){
    this.calendarOptions = {
      plugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek',
      headerToolbar: {
        left: 'prev,next', // to switch between month, week and day
        center: 'title', // to show what month it's currently on
        right: 'dayGridMonth,timeGridWeek,timeGridDay' // buttons for switching between views
      },
      // dateClick: this.handleDateClick.bind(this), // bind is important!
      events: this.apiEvents,
      eventClick: (idOfClickedTask) => {
        // console.log('id = ' + idOfClickedTask.event.id);
        // console.log('Title = ' + idOfClickedTask.event.title);
        // console.log('Start time = ' + idOfClickedTask.event.start);
        // console.log('End time = ' + idOfClickedTask.event.end);
        // console.log(idOfClickedTask.event);
        this.stateStorageService.setTaskScheduleStorage(idOfClickedTask);
        // this.router.navigate(['/updatetask']);
        const dialogRef = this.dialog.open(UpdateTaskComponent, {
          width: '80%',
          height: '60%'
        });
        dialogRef.afterClosed().subscribe(result => {
          this.dataReload();
        });
      }
    };
  }

  // reload the data from update component once dialog box has been closed
  dataReload() {
    this.CalendarData(this.currentStaffSelected.id);
  }

  openDialogAddTask() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '80%',
      height: '60%'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.dataReload();
    });
  }


handleDateClick(arg) {
    alert('date click! ' + arg.dateStr);
  }

  // has the user logged in
loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;

  }





  // loggedOut() {
  //   const token = localStorage.removeItem('token');
  //   console.log('logged out');
  // }
}
