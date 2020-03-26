import { EventService } from './../_services/Event.service';
import { Component, OnInit, Injectable } from '@angular/core';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './CalendarView.component.html',
  styleUrls: ['./CalendarView.component.css']
})

export class CalendarViewComponent implements OnInit {
  events: any[];

  options: any;
  // allows for month, week, day options to be added.
  header: any;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getEvents().then(events => {this.events = events; });
    // allows the calander to be displayed in either month, week or day
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: '2020-03-01',
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      editable: true,
      // empty date has been clicked on
      dateClick: (e) =>  {
        console.log('date has been clicked');
      }
    };
  }
}
