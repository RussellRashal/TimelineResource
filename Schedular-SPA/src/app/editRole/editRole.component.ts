import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditNameService } from '../_services/editName.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-editRole',
  templateUrl: './editRole.component.html',
  styleUrls: ['./editRole.component.scss']
})
export class EditRoleComponent implements OnInit {
newRole;
userName;
editForm: FormGroup;


  constructor(
    private editNameService: EditNameService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit() {
    this.CreateForm();
  }

  updateRole(){
    this.userName = this.editForm.value.userName,
    this.newRole = this.editForm.value.newRole;

    console.log(this.newRole, this.userName);

    this.editNameService.editRole( this.userName, this.newRole).subscribe(next => {
      alert('update sucessful');
  }, error => {
      alert('something went wrong');

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
