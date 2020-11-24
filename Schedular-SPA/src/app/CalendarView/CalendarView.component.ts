import { TestTaskComponent } from './../TestTask/TestTask.component';
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
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-calendarview',
  templateUrl: './CalendarView.component.html',
  styleUrls: ['./CalendarView.component.css']
})
export class CalendarViewComponent implements OnInit {
  apiEvents: any[];
  currentUserLoggedIn;
  testTaskSchedule;
  currentUserSelected;
  selectedFullName;
  test;
  selectedTask: any[];
  idSelected: number;
  searchTask: FormControl;

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
    firstDay: 1
  };


  constructor(
    private taskScheduleService: TaskScheduleService,
    private authService: AuthService,
    private stateStorageService: StateStorageService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.currentUserSelected = JSON.parse(localStorage.getItem('user'));
    this.runCalendarData(this.currentUserSelected);
    this.stateStorageService.setClickedOnUser(this.currentUserSelected);
    this.selectedFullName = this.currentUserSelected.firstName + ' ' + this.currentUserSelected.lastName;
    this.searchTask = new FormControl();
  }

  runCalendarData(userclicked) {
    this.currentUserSelected = userclicked;
    this.stateStorageService.setClickedOnUser(userclicked);
    this.selectedFullName = userclicked.firstName + ' ' + userclicked.lastName;
    this.taskScheduleService.getCalendarTaskScheduleByUserId(userclicked.id).subscribe((data) => {
      this.apiEvents = data;
      this.calendar(this.apiEvents);
    }, error => {
      console.log(error);
    });

  }

  CalendarData(UserId) {
    this.taskScheduleService.getCalendarTaskScheduleByUserId(UserId).subscribe((data) => {
      this.apiEvents = data;
      this.calendar(this.apiEvents);
    }, error => {
      console.log(error);
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
      firstDay: 1,
      eventClick: (idOfClickedTask) => {
        // get id of selected task, then filter out the array to get the selected task sent to updateTask
        this.idSelected = Number(idOfClickedTask.event.id);
        // this.selectedTask =  this.apiEvents.find(x => x.id === this.idSelected);
        // console.log(this.selectedTask);

        this.stateStorageService.setTaskId(this.idSelected);
        // this.router.navigate(['/updateTask/' + this.idSelected]);
        const dialogRef = this.dialog.open(UpdateTaskComponent, {
          width: '80%',
          height: '90%'
        });
        dialogRef.afterClosed().subscribe(result => {
          this.dataReload();
        });
      }
    };
  }

  // reload the data from update component once dialog box has been closed
  dataReload() {
    this.CalendarData(this.currentUserSelected.id);
  }

  searchTaskBox() {
    this.stateStorageService.setTaskId(this.searchTask.value);
    const dialogRef = this.dialog.open(UpdateTaskComponent, {
      width: '80%',
      height: '90%'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.dataReload();
    });
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
