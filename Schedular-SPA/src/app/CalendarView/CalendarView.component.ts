import { EventService } from './../_services/Event.service';
import { Component, OnInit, Injectable } from '@angular/core';
import {FullCalendarModule} from 'primeng/fullcalendar';


@Component({
  selector: 'app-calendar-view',
  templateUrl: './CalendarView.component.html',
  styleUrls: ['./CalendarView.component.css']
})

export class CalendarViewComponent implements OnInit {
  events: any[];


  constructor(private eventService: EventService) {}

  ngOnInit() {
     this.eventService.getEvents().then(events => {this.events = events; });
  }
}


