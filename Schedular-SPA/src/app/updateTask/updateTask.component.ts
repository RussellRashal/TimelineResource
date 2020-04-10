import { TaskSchedule } from './../_models/taskSchedule';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateStorageService } from '../_services/stateStorage.service';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { TaskScheduleService } from '../_services/taskSchedule.service';

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
  returnedStartDateAndTime: string;
  returnedEndDateAndTime: string;
  putServiceTaskSchedule: TaskSchedule;


  hourSelectors: string[] = [];
  minuteSelectors: string[] = [];

  constructor(
    private router: Router,
    private stateStorageService: StateStorageService,
    private datePipe: DatePipe,
    private taskScheduleService: TaskScheduleService) {}


  ngOnInit() {
    this.taskScheduleData = this.stateStorageService.gettaskScheduleDataStorage();
    this.currentUserData = this.stateStorageService.getCurrentStaffDataStorage();
    this.StaffMemberModels = this.stateStorageService.getStaffMemberStorage();

    this.currentStartTimeDate = this.taskScheduleData.event.start;
    this.currentEndTimeDate = this.taskScheduleData.event.end;
    this.transformDate();

    this.dropDownTimeList();
    this.initForm();

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

  onSubmit() {
    // the date and time need to be rejoined to be sent to the database
    this.returnedStartDateAndTime =
      this.profileForm.value.startDate.toString() + ' ' +
      this.profileForm.value.startHourTime.toString() + ':' +
      this.profileForm.value.startMinuteTime.toString();

    this.returnedEndDateAndTime =
      this.profileForm.value.endDate.toString() + ' ' +
      this.profileForm.value.endHourTime.toString() + ':' +
      this.profileForm.value.endMinuteTime.toString();

    // data to send to the back-end taskSchedule table
    // console.log(this.taskScheduleData.event.id);
    // console.log(this.profileForm.value.taskTextArea);
    // console.log(this.returnedStartDateAndTime);
    // console.log(this.returnedEndDateAndTime);
    // console.log(this.profileForm.value.staffName);

    this.putServiceTaskSchedule = {
      title: this.profileForm.value.taskTextArea,
      start: new Date(this.returnedStartDateAndTime),
      end: new Date(this.returnedEndDateAndTime),
      staffId: Number(this.profileForm.value.staffName)
    };

    console.log(this.putServiceTaskSchedule);


    this.taskScheduleService.putTaskSchedule(
      this.taskScheduleData.event.id,
      this.putServiceTaskSchedule).subscribe(next => {
        console.log('success');
        this.router.navigate(['/cal']);
      }, error => {
        console.log('error POST did not go through: ' + error);
      });
  }

  deleteTask() {
    console.log(this.taskScheduleData.event.id);
    this.taskScheduleService.deleteTaskSchedule(this.taskScheduleData.event.id).subscribe(next => {
      console.log('Deleted');
      this.router.navigate(['/cal']);
    }, error => {
      console.log('unable to delete');
    });
  }

   // has the user logged in
   loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  loggedOut() {
    const token = localStorage.removeItem('token');
    console.log('logged out');
  }

}
