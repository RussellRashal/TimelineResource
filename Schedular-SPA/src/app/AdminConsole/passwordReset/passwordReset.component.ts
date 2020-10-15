
import { EditUserService } from './../../_services/editUser.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StateStorageService } from 'src/app/_services/stateStorage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-passwordReset',
  templateUrl: './passwordReset.component.html',
  styleUrls: ['./passwordReset.component.css']
})
export class PasswordResetComponent implements OnInit {
  userMemberModels;
  ResetPass: FormGroup;
  model: any = {};

  constructor(private stateStorageService: StateStorageService, private editUserService: EditUserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userMemberModels = this.stateStorageService.getUserMemberStorage();
    this.CreateForm();
  }
  updatePassword() {
    this.model = {
      username: this.ResetPass.value.username,
      newPassword: this.ResetPass.value.newPassword
    };

    console.log(this.model);

    this.editUserService.editPassword(this.model).subscribe(next => {
        alert('update sucessful');
    }, error => {
        console.log(error);
    });
  }


  CreateForm() {
    this.ResetPass = new FormGroup({
      username: new FormControl(''),
      newPassword: new FormControl('')
    });
  }


}
