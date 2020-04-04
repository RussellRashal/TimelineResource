import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateStorageService } from '../_services/stateStorage.service';
import { TaskSchedule } from '../_models/taskSchedule';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-update-task',
  templateUrl: './updateTask.component.html',
  styleUrls: ['./updateTask.component.css']
})

export class UpdateTaskComponent implements OnInit {

  profileForm: FormGroup;

  time = {hour: 13, minute: 30};
  taskScheduleData;
  currentUserData;
  StaffMemberModels;
  currentStartTimeDate;
  currentEndTimeDate;
  startDateConvert;
  endDateConvert;
  hourStartTimeConvert;
  minuteStartTimeConvert;
  hourEndTimeConvert;
  minuteEndTimeConvert;
  currentFullName: string;
  stringStaffMemberModel: any[];





  hourSelectors: string[] = [];
  minuteSelectors: string[] = [];



  constructor(
    private router: Router,
    private stateStorageService: StateStorageService,
    private datePipe: DatePipe) {}


  ngOnInit() {
    this.taskScheduleData = this.stateStorageService.gettaskScheduleDataStorage();
    this.currentUserData = this.stateStorageService.getCurrentStaffDataStorage();
    this.StaffMemberModels = this.stateStorageService.getStaffMemberStorage();

    this.currentStartTimeDate = this.taskScheduleData.event.start;
    this.currentEndTimeDate = this.taskScheduleData.event.end;
    this.transformDate();
    // console.log(this.startDateConvert);
    // console.log(this.endDateConvert);

    // minute creation
    for (let i = 1; i < 60; i++) {
      if (i < 10) {
        this.minuteSelectors[i] = '0' + i.toString();
      } else {
        this.minuteSelectors[i] = i.toString();
      }
    }
    // hour creation
    for (let i = 1; i < 23; i++) {
      this.hourSelectors[i] = i.toString();
    }

    this.initForm();

    // console.log(this.currentUserData.id);
  }

  initForm() {
    this.profileForm = new FormGroup({
      staffName: new FormControl(''),
      taskTextArea: new FormControl(''),
      startDate: new FormControl(''),
      startHourTime: new FormControl(''),
      startMinuteTime: new FormControl(''),
      endDate: new FormControl(''),
      endHourTime: new FormControl(''),
      endMinuteTime: new FormControl('')
    });
    this.profileForm.patchValue({
      staffName: this.currentUserData.id,
      taskTextArea: this.taskScheduleData.event.title,
      startDate: this.startDateConvert,
      startHourTime: this.hourStartTimeConvert,
      startMinuteTime: this.minuteStartTimeConvert,
      endDate: this.endDateConvert,
      endHourTime: this.hourEndTimeConvert,
      endMinuteTime: this.minuteEndTimeConvert
    });
  }


  // convert date into a usable format for the datepicker in the template

  transformDate() {
    // convert the date
    this.startDateConvert = this.datePipe.transform(this.currentStartTimeDate, 'yyyy-MM-dd');
    this.endDateConvert = this.datePipe.transform(this.currentEndTimeDate, 'yyyy-MM-dd');
    // convert the start time
    this.hourStartTimeConvert = this.datePipe.transform(this.currentStartTimeDate, 'h');
    this.minuteStartTimeConvert = this.datePipe.transform(this.currentStartTimeDate, 'mm');
    // convert the end time
    this.hourEndTimeConvert = this.datePipe.transform(this.currentEndTimeDate, 'h');
    this.minuteEndTimeConvert = this.datePipe.transform(this.currentEndTimeDate, 'mm');
  }

  onSubmit() {
    console.log('success');
  }

}



