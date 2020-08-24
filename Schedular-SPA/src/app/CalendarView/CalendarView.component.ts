import { AuthService } from './../_services/auth.service';
import { TaskSchedule } from './../_models/taskSchedule';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { TaskScheduleService } from '../_services/taskSchedule.service';

@Component({
  selector: 'app-calendarview',
  templateUrl: './CalendarView.component.html',
  styleUrls: ['./CalendarView.component.scss']
})
export class CalendarViewComponent implements OnInit {
  apiEvents: any[];
  currentUserLoggedIn;
  selectedFullNameStaff;

  calendarOptions: CalendarOptions = {
    plugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'timeGridWeek',
    headerToolbar: {
      left: 'prev,next', // to switch between month, week and day
      center: 'title', // to show what month it's currently on
      right: 'dayGridMonth,timeGridWeek,timeGridDay' // buttons for switching between views
    },
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: []
  };

  constructor(
    private taskScheduleService: TaskScheduleService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.currentUserLoggedIn = JSON.parse(localStorage.getItem('username'));
    const currentUserLoggedInId = JSON.parse(localStorage.getItem('id'));

    console.log('currently logged in as ' + this.currentUserLoggedIn);
    console.log('their id is ' + currentUserLoggedInId);
    this.selectedFullNameStaff = this.currentUserLoggedIn;
    this.InitialCalendarData(currentUserLoggedInId);
  }

  runCalendarData(staff) {
    this.selectedFullNameStaff = staff.firstName + ' ' + staff.lastName;
    this.taskScheduleService.getTaskScheduleByStaffId(staff.id).subscribe((data) => {
      this.apiEvents = data;
      this.calendar(this.apiEvents);
    });

  }

  InitialCalendarData(staff) {
    this.taskScheduleService.getTaskScheduleByStaffId(staff).subscribe((data) => {
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
      dateClick: this.handleDateClick.bind(this), // bind is important!
      events: this.apiEvents
    };
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
