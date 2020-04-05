import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-picker',
  templateUrl: './timePicker.component.html',
  styleUrls: ['./timePicker.component.css']
})
export class TimePickerComponent implements OnInit {
  hourSelectors: string[] = [];
  minuteSelectors: string[] = [];

  constructor() { }

  ngOnInit() {
  }

  dropDownTimeList() {
    // minute creation
    for (let i = 0; i < 60; i++) {
      if (i < 10) {
        this.minuteSelectors[i] = '0' + i.toString();
      } else {
        this.minuteSelectors[i] = i.toString();
      }
    }
    // hour creation
    for (let i = 0; i < 24; i++) {
      this.hourSelectors[i] = i.toString();
    }
  }

}
