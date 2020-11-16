import { TestBed } from '@angular/core/testing';
import { CustomerTasksService } from './../../_services/customerTasks.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UpdateTaskComponent } from './../../updateTask/updateTask.component';
import { Pagination } from './../../_models/pagination';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { StateStorageService } from 'src/app/_services/stateStorage.service';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { CustomerService } from 'src/app/_services/customer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customertasks',
  templateUrl: './customerTasks.component.html',
  styleUrls: ['./customerTasks.component.css']
})
export class CustomerTasksComponent implements OnInit {
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

  pagination: Pagination;
  pageNumber = 1;
  pageSize = 10;
  customerType: string = environment.customerType;


  constructor(
    private stateStorageService: StateStorageService,
    private customerTasksService: CustomerTasksService,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.loadUser();
    this.initialiseForm();
    this.getCustomers();
  }

  customerTaskTime() {
    this.dateError = false;
    this.nullError = false;

    // validation check
    if (this.profileForm.value.customerId === '') {
      this.nullError = true;
    }
    else if (this.profileForm.value.startDate > this.profileForm.value.endDate) {
      this.dateError = true;
    }
    else {
      this.customerTasksService.GetCustomerTasks(
        this.profileForm.value.customerId,
        this.profileForm.value.startDate,
        this.profileForm.value.endDate,
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

  allCustomerTasks() {
    this.customerTasksService.GetAllCustomerTasks(
      this.profileForm.value.customerId,
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
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe((data) => {
      this.customers = data;
    }, error => {
      console.log(error);
    });
  }

  initialiseForm() {
    this.profileForm = new FormGroup({
      customerId: new FormControl(),
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
       this.customerTaskTime();
    });
  }

  updateDialogAll(taskId) {
    this.stateStorageService.setTaskId(taskId);
    const dialogRef = this.dialog.open(UpdateTaskComponent, {
      width: '80%',
      height: '90%'
    });
    dialogRef.afterClosed().subscribe(result => {
       this.allCustomerTasks();
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
