import { EditUserService } from './../../_services/editUser.service';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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


  constructor(
    private editUserService: EditUserService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit() {
    this.CreateForm();
  }

  updateRole(){
    this.userName = this.editForm.value.userName,
    this.role = this.editForm.value.role;

    console.log(this.role, this.userName);

    this.editUserService.editRole( this.userName, this.role).subscribe(next => {
      alert('update sucessful');
  }, error => {
      console.log(error);

  });



  }

  CreateForm() {
    this.editForm = new FormGroup({
      userName: new FormControl(''),
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
