import { AddTaskComponent } from './../addTask/addTask.component';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UpdateTaskComponent } from '../updateTask/updateTask.component';
import { Router } from '@angular/router';
import { UserMemberService } from '../_services/userMember.service';
import { StateStorageService } from '../_services/stateStorage.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigationBar.component.html',
  styleUrls: ['./navigationBar.component.css']
})
export class NavigationBarComponent implements OnInit {
  model: any = {};
  loginReactiveForm: FormGroup;
  role;
  users: any[];
  userAuthorised: boolean;
  searchTask: FormControl;


  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router,
    private userMemberService: UserMemberService,
    private stateStorageService: StateStorageService) { }

  ngOnInit() {
    this.initForm();
    this.isUserAdmin();
  }

  login() {
    this.model.username = this.loginReactiveForm.value.username;
    this.model.password = this.loginReactiveForm.value.password;



    this.authService.login(this.model).subscribe(next => {
      this.loadUsers();
      this.router.navigateByUrl('/CalendarView');
      this.isUserAdmin();
      }, error => {
        console.log('failed to login');
      });
  }

  isUserAdmin() {
    // get users role
    this.role = JSON.parse(localStorage.getItem('role'));
    console.log('this is role = ' + this.role);
  // if user is not an Admin
    if (this.role !== 'Admin') {
      this.userAuthorised = false;
      console.log('value of auth is = ' + this.userAuthorised );
    } // if user is an Admin
    else {
      // list of users for the drop down
      this.userAuthorised = true;
      console.log('value of auth is = ' + this.userAuthorised );
    }
  }

  loadUsers() {
    this.userMemberService.getUsers().subscribe((data) => {
      this.users = data;
      this.stateStorageService.setUserMemberStorage(this.users);
    }, error => {
      console.log(error);
    });
  }

  initForm() {
    this.loginReactiveForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });

    this.searchTask = new FormControl();

  }

  // has the user logged in
  loggedIn() {
    return this.authService.loggedIn();
  }

  loggedOut() {
    const token = localStorage.removeItem('token');
    const username = localStorage.removeItem('user');
    const userId = localStorage.removeItem('role');
  }
}
