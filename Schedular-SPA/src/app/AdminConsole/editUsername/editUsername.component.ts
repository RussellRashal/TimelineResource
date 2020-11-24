import { EditUserService } from '../../_services/editUser.service';
import { StateStorageService } from '../../_services/stateStorage.service';
import { UserMemberService } from '../../_services/userMember.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserMemberModel } from '../../_models/UserMemberModel';
import { HttpClient } from '@angular/common/http';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-editUsername',
  templateUrl: './editUsername.component.html',
  styleUrls: ['./editUsername.component.css']
})
export class EditUsernameComponent implements OnInit {
  editForm: FormGroup;
  role;
  userMemberModels;
  editUser;

  constructor(
    private userMemberService: UserMemberService,
    private stateStorageService: StateStorageService,
    private editUserService: EditUserService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit() {
    // this.userMemberModels = this.stateStorageService.getUserMemberStorage();
    this.route.data.subscribe(data => {
      this.userMemberModels = data['UserMemberModel'];
    }, error => {
      console.log(error);
    });
    this.CreateForm();
  }

  UpdateUser() {
    this.editUser = {
       CurrentUserName: this.editForm.value.currentUsername,
       NewFirstName: this.editForm.value.firstname,
       NewLastName: this.editForm.value.lastName
    };

    this.editUserService.putEditName(this.editUser).subscribe(next => {
        alert('update sucessful');
        window.location.reload();
    }, error => {
        console.log(error);
    });
  }

  CreateForm() {
    this.editForm = new FormGroup({
      currentUsername: new FormControl(''),
      firstname: new FormControl(''),
      lastName: new FormControl('')
    });
  }


  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  loggedOut() {
    const token = localStorage.removeItem('token');
    console.log('logged out');
  }

  sendUserButtonClick(id) {
    console.log('button clicked');
  }
}

