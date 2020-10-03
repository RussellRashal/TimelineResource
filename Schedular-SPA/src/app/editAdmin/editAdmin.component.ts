import { EditNameService } from './../_services/editName.service';
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
  editForm: FormGroup;
  currentUserData;
  role;
  userMemberModels;
  currentUserName;
  firstname: any;
  LastName: any;
  usernameSelected;

  constructor(
    private userMemberService: UserMemberService,
    private stateStorageService: StateStorageService,
    private editNameService: EditNameService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit() {
    this.userMemberModels = this.stateStorageService.getUserMemberStorage();
    this.CreateForm();
    console.log(this.userMemberModels);

  }
UpdateUser() {
    this.usernameSelected = this.userMemberModels.username;


    this.currentUserName = this.editForm.value.currentUserName.username,
    this.firstname = this.editForm.value.firstname,
    this.LastName = this.editForm.value.LastName;

    console.log(this.currentUserName);

    console.log(this.currentUserName, this.firstname , this.LastName);

    this.editNameService.puteditName(this.usernameSelected  , this.firstname, this.LastName).subscribe(next => {
      alert('update sucessful');
  }, error => {
      alert('something went wrong');

  });

}

CreateForm() {
  this.editForm = new FormGroup({
    currentUserName: new FormControl(''),
    firstname: new FormControl(''),
    LastName: new FormControl('')
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


}

