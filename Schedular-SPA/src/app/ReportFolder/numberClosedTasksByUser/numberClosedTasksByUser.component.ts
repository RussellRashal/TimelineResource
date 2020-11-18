import { NumberClosedTasksByUserService } from './../../_services/NumberClosedTasksByUser.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-number-closed-tasks-by-user',
  templateUrl: './numberClosedTasksByUser.component.html',
  styleUrls: ['./numberClosedTasksByUser.component.css']
})
export class NumberClosedTasksByUserComponent implements OnInit {
  userClosed;
  profileForm;
  dateError: boolean;


  constructor(
    private numberClosedTasksByUserService: NumberClosedTasksByUserService) { }

  ngOnInit() {
    this.initialiseForm();

  }

  onSubmit() {
    if (this.profileForm.value.startDate > this.profileForm.value.endDate) {
      this.dateError = true;
    }
    else {
      this.numberClosedTasksByUserService.GetClosedTaskbyUser(this.profileForm.value.startDate,
        this.profileForm.value.endDate).subscribe((data) => {
        this.userClosed = data;
        console.log(this.userClosed);
      }, error => {
        console.log(error);
      });
    }
  }

  initialiseForm() {
    this.profileForm = new FormGroup({
      startDate: new FormControl(new Date().toISOString().slice(0, 10)),
      endDate: new FormControl(new Date().toISOString().slice(0, 10))
    });
  }

  // validation
  getDateError(){
    return this.dateError;
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
