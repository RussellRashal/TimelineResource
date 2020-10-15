import { EditUserService } from './../../_services/editUser.service';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StateStorageService } from 'src/app/_services/stateStorage.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-editRole',
  templateUrl: './editRole.component.html',
  styleUrls: ['./editRole.component.scss']
})
export class EditRoleComponent implements OnInit {
  role;
  userName;
  editForm: FormGroup;
  userMemberModels;
  userRole;


  constructor(
    private editUserService: EditUserService,
    private stateStorageService: StateStorageService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit() {
    this.userMemberModels = this.stateStorageService.getUserMemberStorage();
    this.CreateForm();
  }

  updateRole() {
    this.userRole = {
      Username: this.editForm.value.username,
      NewRole: this.editForm.value.role
    };
    this.editUserService.editRole(this.userRole).subscribe(next => {
      alert('User Role Updated');
  }, error => {
      console.log(error);

  });



  }

  CreateForm() {
    this.editForm = new FormGroup({
      username: new FormControl(''),
      role: new FormControl('')
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
