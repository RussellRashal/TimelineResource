import { Component, OnInit } from '@angular/core';
import { StateStorageService } from '../_services/stateStorage.service';
import { FormGroup, FormControl } from '@angular/forms';
import { TaskSchedule } from '../_models/taskSchedule';
import { TaskScheduleService } from '../_services/taskSchedule.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './addTask.component.html',
  styleUrls: ['./addTask.component.css']
})
export class AddTaskComponent implements OnInit {
  hourSelectors: string[] = [];
  minuteSelectors: string[] = [];
  StaffMemberModels;
  profileForm: FormGroup;
  returnedStartDateAndTime: string;
  returnedEndDateAndTime: string;
  postServiceTaskSchedule: TaskSchedule;
  currentUserData;

  constructor(
    private stateStorageService: StateStorageService,
    private taskScheduleService: TaskScheduleService,
    private router: Router) { }

  ngOnInit() {
    // get staff from storageService
    this.StaffMemberModels = this.stateStorageService.getStaffMemberStorage();

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

    this.postServiceTaskSchedule = {
      title: this.profileForm.value.taskTextArea,
      start: this.returnedStartDateAndTime,
      end: this.returnedEndDateAndTime,
      staffId: Number(this.profileForm.value.staffName)
    };

    console.log(this.postServiceTaskSchedule);


    this.taskScheduleService.postTaskSchedule(this.postServiceTaskSchedule).subscribe(next => {
        console.log('success');
        this.router.navigate(['/CalendarView']);
      }, error => {
        console.log('error POST did not go through: ' + error);
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
