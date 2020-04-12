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

  constructor(
    private stateStorageService: StateStorageService,
    private hoursWorkedService: HoursWorkedService
  ) { }

  ngOnInit() {
    this.StaffMemberModels = this.stateStorageService.getStaffMemberStorage();

    this.initForm();
  }

  onSubmit() {
    this.hoursWorkedService.getHoursWorked(
      this.profileForm.value.staffId,
      this.profileForm.value.startDate,
      this.profileForm.value.endDate
    ).subscribe((data) => {
      this.hoursWorked = data;
      console.log(this.hoursWorked);
    });


    // console.log(this.hoursWorked);
    // console.log(this.profileForm.value.staffId);
    // console.log(this.profileForm.value.startDate);
    // console.log(this.profileForm.value.endDate);
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
