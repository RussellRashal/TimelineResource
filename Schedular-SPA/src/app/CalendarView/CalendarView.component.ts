import { EventService } from './../_services/Event.service';
import { Component, OnInit, Injectable} from '@angular/core';
import {Router} from '@angular/router';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { StaffMemberModel } from '../_models/StaffMemberModel';
import { StateStorageService } from '../_services/stateStorage.service';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './CalendarView.component.html',
  styleUrls: ['./CalendarView.component.css']
})

export class CalendarViewComponent implements OnInit {
  events: any[];
  staffMemberModel: StaffMemberModel[];

  options: any;
  // allows for month, week, day options to be added.
  header: any;
  // idOfStaffForeignKeyToTask is needed to allow the 'eventClick()' to have the staff Id
  // There is no staffId with the event object
  idOfStaffForeignKeyToTask;

  constructor(
    private eventService: EventService,
    private router: Router,
    private stateStorageService: StateStorageService) {}

  ngOnInit() {
    this.runCalendarData(1);
  }

  runCalendarData(idOfStaff) {
    this.idOfStaffForeignKeyToTask = idOfStaff;
    this.eventService.getEvents(idOfStaff).then(events => {this.events = events; });


    // allows the calander to be displayed in either month, week or day
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: '2020-03-01',
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      // empty date has been clicked on
      // dateClick: (e) =>  {
      //   console.log('date has been clicked');
      // }
      dateClick(info) {
        // alert('Clicked on: ' + info.dateStr);
        // alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
        // alert('Current view: ' + info.view.type);
        // // change the day's background color just for fun
        // info.dayEl.style.backgroundColor = 'red';
        // console.log(info.dateStr);
      },

      eventClick: (idOfClickedTask) => {
        // console.log(idOfClickedTask.event.id);
        // console.log(idOfClickedTask.event.title);
        // console.log(idOfClickedTask.event.start);
        // console.log(idOfClickedTask.event.end);
        // console.log(this.idOfStaffForeignKeyToTask);
        const arrayOfClickedTask = [
          idOfClickedTask.event.id,
          idOfClickedTask.event.title,
          idOfClickedTask.event.start,
          idOfClickedTask.event.end,
          this.idOfStaffForeignKeyToTask];

        // console.log(arrayOfClickedTask);
        this.stateStorageService.setStateStorage(arrayOfClickedTask);
        this.router.navigate(['/updateTask']);
      }
    };
  }
}
