import { HoursWorkedService } from './../_services/hoursWorked.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { StateStorageService } from '../_services/stateStorage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hours-worked',
  templateUrl: './HoursWorked.component.html',
  styleUrls: ['./HoursWorked.component.css']
})
export class HoursWorkedComponent implements OnInit {
  profileForm: FormGroup;
  UserMemberModels;
  hoursWorked;
  minuteWorked;
  nullError;
  currentUser;
  userAuthorised: boolean;
  dateError: boolean;
  tasksFromHoursWorkeds;
  role;

  constructor(
    private stateStorageService: StateStorageService,
    private hoursWorkedService: HoursWorkedService,
    private route: ActivatedRoute) { }

  ngOnInit() {


    // who the current user is
    this.route.data.subscribe(data => {
      this.currentUser = data['CurrentUser'];
    }, error => {
      console.log(error);
    });

    console.log('id of current user = ' + this.currentUser.id);

    this.role = JSON.parse(localStorage.getItem('role'));
    // if user is not a manager
    if (this.role !== 'Manager') {
      console.log('not manager');
      this.userAuthorised = false;
    } // if user is a manager
    else {
      // list of users for the drop down
      this.route.data.subscribe(data => {
        this.UserMemberModels = data['UserMemberModel'];
      }, error => {
        console.log(error);
      });
      this.userAuthorised = true;
      console.log('manager has logged in login');
    }



    this.initialiseForm();
  }




  onSubmit() {
    this.dateError = false;
    this.nullError = false;

    // validation check
    if (this.profileForm.value.userId === '') {
      this.nullError = true;
    }
    else if (this.profileForm.value.startDate > this.profileForm.value.endDate) {
      this.dateError = true;
    }
    else {
      this.hoursWorkedService.GetHoursWorked(
        this.profileForm.value.userId,
        this.profileForm.value.startDate,
        this.profileForm.value.endDate
      ).subscribe((data) => {
        // log hours returned from api into reactive forms for the front template
        this.hoursWorked = data[0];
        this.minuteWorked = data[1];
        // console.log(this.hoursWorked[0]);
      }, error => {
        console.log(error);
      });

      // tasks to show on the bottom
      this.hoursWorkedService.GetTasksWithinHoursWorked(
        this.profileForm.value.userId,
        this.profileForm.value.startDate,
        this.profileForm.value.endDate
      ).subscribe((data) => {
        this.tasksFromHoursWorkeds = data;
      }, error => {
        console.log(error);
      });
    }
  }

  initialiseForm() {
    this.profileForm = new FormGroup({
      userId: new FormControl(this.currentUser.id),
      startDate: new FormControl(new Date().toISOString().slice(0, 10)),
      endDate: new FormControl(new Date().toISOString().slice(0, 10))
    });
  }

   // validation checker for template div tags
  getDateError(){
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

  authorised() {
    return this.userAuthorised;
  }

}
