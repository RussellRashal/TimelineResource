import { TaskSchedule } from './../_models/taskSchedule';
import { EventService } from './../_services/Event.service';
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
    private eventService: EventService,
    private taskScheduleService: TaskScheduleService
  ) { }

  ngOnInit() {
  }

  runCalendarData(staffObject) {
    this.taskScheduleService.getTaskScheduleByStaffId(staffObject.id).subscribe((data) => {
      this.apiEvents = data;
      // console.log(this.apiEvents);
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
}
