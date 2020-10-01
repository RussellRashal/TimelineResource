import { StateStorageService } from './../_services/stateStorage.service';
import { UserMemberService } from './../_services/userMember.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserMemberModel } from './../_models/UserMemberModel';
import { HttpClient } from '@angular/common/http';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-editAdmin',
  templateUrl: './editAdmin.component.html',
  styleUrls: ['./editAdmin.component.scss']
})
export class EditAdminComponent implements OnInit {
  profileForm: FormGroup;
  currentUserData;
  role;
  userMembers: any;
  userAuthorised: boolean;
  userMemberModels: any;

  constructor(
    private userMemberService: UserMemberService,
    private stateStorageService: StateStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit() {
    this.userMemberModels = this.stateStorageService.getUserMemberStorage();
    console.log(this.userMemberModels);

    this.role = JSON.parse(localStorage.getItem('role'));
    // if user is not a manager
    if (this.role !== 'Admin') {
      this.userAuthorised = false;
    } // if user is a manager
    else {
      // list of users for the drop down
      this.userMemberModels = this.userMemberService.getUsers();

      this.userAuthorised = true;

    }
    this.loggedIn();

  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  loggedOut() {
    const token = localStorage.removeItem('token');
    console.log('logged out');
  }


}

