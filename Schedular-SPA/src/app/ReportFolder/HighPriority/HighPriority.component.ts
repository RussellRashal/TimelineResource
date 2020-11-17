import { HighPriorityService } from './../../_services/highPriority.service';
import { CustomerTasksService } from './../../_services/customerTasks.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UpdateTaskComponent } from './../../updateTask/updateTask.component';
import { Pagination } from './../../_models/pagination';
import { StateStorageService } from 'src/app/_services/stateStorage.service';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { CustomerService } from 'src/app/_services/customer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-highpriority',
  templateUrl: './HighPriority.component.html',
  styleUrls: ['./HighPriority.component.css']
})
export class HighPriorityComponent implements OnInit {
  profileForm: FormGroup;
  hoursWorked;
  minuteWorked;
  nullError;
  currentUser;
  userAuthorised: boolean;
  dateError: boolean;
  customerTasksData;
  role;
  customers;
  selectedbutton;

  pagination: Pagination;
  pageNumber = 1;
  pageSize = 10;
  customerType: string = environment.customerType;


  constructor(
    private stateStorageService: StateStorageService,
    private highPriorityService: HighPriorityService,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.loadUser();
    this.initialiseForm();
  }

  highPriorityTaskTime() {
    this.selectedbutton = 'highPriorityTaskTime';
    this.dateError = false;
    this.nullError = false;

    // validation check
    if (this.profileForm.value.startDate > this.profileForm.value.endDate) {
      this.dateError = true;
    }
    else {
      this.highPriorityService.GetHighPriorityTasksByTime(
        this.profileForm.value.startDate,
        this.profileForm.value.endDate,
        this.profileForm.value.status,
        this.pageNumber,
        this.pageSize
      ).subscribe((data) => {
        this.customerTasksData = data.result; // get jason data
        this.pagination = data.pagination;   // get pagination data
        }, error => {
          console.log(error);
      });
    }
  }

  allHighPriorityTask() {
    this.selectedbutton = 'allHighPriorityTask';
    this.highPriorityService.GetAllHighPriorityTasks(
      this.profileForm.value.status,
      this.pageNumber,
      this.pageSize
    ).subscribe((data) => {
      this.customerTasksData = data.result; // get jason data
      this.pagination = data.pagination;   // get pagination data
      console.log(this.customerTasksData);
      }, error => {
        console.log(error);
    });

  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    if (this.selectedbutton === 'highPriorityTaskTime') {
      this.highPriorityTaskTime();
    }
    if (this.selectedbutton === 'allHighPriorityTask') {
      this.allHighPriorityTask();
    }
  }

  initialiseForm() {
    this.profileForm = new FormGroup({
      status: new FormControl(),
      startDate: new FormControl(new Date().toISOString().slice(0, 10)),
      endDate: new FormControl(new Date().toISOString().slice(0, 10))
    });
  }

  updateDialogTime(taskId) {
    this.stateStorageService.setTaskId(taskId);
    const dialogRef = this.dialog.open(UpdateTaskComponent, {
      width: '80%',
      height: '90%'
    });
    dialogRef.afterClosed().subscribe(result => {
       this.highPriorityTaskTime();
    });
  }

  updateDialogAll(taskId) {
    this.stateStorageService.setTaskId(taskId);
    const dialogRef = this.dialog.open(UpdateTaskComponent, {
      width: '80%',
      height: '90%'
    });
    dialogRef.afterClosed().subscribe(result => {
       this.allHighPriorityTask();
    });
  }

  loadUser() {
    this.role = JSON.parse(localStorage.getItem('role'));
    // if user is not a manager
    if (this.role !== 'Admin') {
      console.log('Standard Account');
      this.userAuthorised = false;
    } // if user is a manager
    else {
      this.userAuthorised = true;
      console.log('Admin has logged in login');
    }
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

}
