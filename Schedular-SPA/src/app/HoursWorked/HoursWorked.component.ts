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
  HoursWorkedStr;
  MinuteWorkedStr;

  tasksFromHoursWorkeds;

  constructor(
    private stateStorageService: StateStorageService,
    private hoursWorkedService: HoursWorkedService) { }

  ngOnInit() {
    this.StaffMemberModels = this.stateStorageService.getStaffMemberStorage();

    this.initForm();
  }

  onSubmit() {
    this.hoursWorkedService.GetHoursWorked(
      this.profileForm.value.staffId,
      this.profileForm.value.startDate,
      this.profileForm.value.endDate
    ).subscribe((data) => {
      // log hours returned from api into reactive forms for the front template
      this.hoursWorked = data;
      this.HoursWorkedStr = this.hoursWorked.toString().slice(0, 2);
      this.MinuteWorkedStr = this.hoursWorked.toString().slice(3, 5);
      // console.log('hour ' + this.HoursWorkedStr + ' minute' + this.MinuteWorkedStr);
    });

    this.hoursWorkedService.GetTasksWithinHoursWorked(
      this.profileForm.value.staffId,
      this.profileForm.value.startDate,
      this.profileForm.value.endDate
    ).subscribe((data) => {
      this.tasksFromHoursWorkeds = data;
      // console.log(this.tasksFromHoursWorkeds);
    });

  }

  initForm() {
    this.profileForm = new FormGroup({
      staffId: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl('')
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
