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

  constructor(private eventService: EventService) {}

  ngOnInit() {
     this.eventService.getEvents().then(events => {this.events = events; });

     this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: '2017-02-01',
      header: {
          left: 'prev,next',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
      },
      editable: true
  };
  }
}


