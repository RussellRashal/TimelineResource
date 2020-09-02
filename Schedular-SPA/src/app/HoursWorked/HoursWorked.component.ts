import { HoursWorkedService } from './../_services/hoursWorked.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { StateStorageService } from '../_services/stateStorage.service';

@Component({
  selector: 'app-hours-worked',
  templateUrl: './HoursWorked.component.html',
  styleUrls: ['./HoursWorked.component.css']
})
export class HoursWorkedComponent implements OnInit {
  profileForm: FormGroup;
  StaffMemberModels;
  hoursWorked;
  minuteWorked;
  nullError;

  dateError: boolean;

  tasksFromHoursWorkeds;

  constructor(
    private stateStorageService: StateStorageService,
    private hoursWorkedService: HoursWorkedService) { }

  ngOnInit() {
    this.StaffMemberModels = this.stateStorageService.getStaffMemberStorage();

    this.initForm();
  }

  onSubmit() {
    this.dateError = false;
    this.nullError = false;

    // validation check
    if (this.profileForm.value.staffId === '') {
      this.nullError = true;
    }
    else if (this.profileForm.value.startDate > this.profileForm.value.endDate) {
      this.dateError = true;
    }
    else {
      this.hoursWorkedService.GetHoursWorked(
        this.profileForm.value.staffId,
        this.profileForm.value.startDate,
        this.profileForm.value.endDate
      ).subscribe((data) => {
        // log hours returned from api into reactive forms for the front template
        this.hoursWorked = data[0];
        this.minuteWorked = data[1];
        // console.log(this.hoursWorked[0]);
      });

      // tasks to show on the bottom
      this.hoursWorkedService.GetTasksWithinHoursWorked(
        this.profileForm.value.staffId,
        this.profileForm.value.startDate,
        this.profileForm.value.endDate
      ).subscribe((data) => {
        this.tasksFromHoursWorkeds = data;
      });
    }
  }

  initForm() {
    this.profileForm = new FormGroup({
      staffId: new FormControl(''),
      startDate: new FormControl(new Date().toISOString().slice(0, 10)),
      endDate: new FormControl(new Date().toISOString().slice(0, 10))
    });
  }

   // validation checker for template div tags
  getDateError() {
    return this.dateError;
  }
  getNullError() {
    return this.nullError;
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
