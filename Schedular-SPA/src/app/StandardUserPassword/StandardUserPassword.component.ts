import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { EditUserService } from '../_services/editUser.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-StandardUserPassword',
  templateUrl: './StandardUserPassword.component.html',
  styleUrls: ['./StandardUserPassword.component.scss']
})

export class StandardUserPasswordComponent implements OnInit {
  ResetPass: FormGroup;
  nullError: boolean;
  model: any = {};

  constructor(private editUserService: EditUserService,  private route: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();
  }

  updatePassword(){
    this.nullError = false;

    if (this.ResetPass.value.currentPassword === '' ||
    this.ResetPass.value.newPassword === '' ||
    this.ResetPass.value.confirmPassword === '') {
      this.nullError = true;
    }
    else if (this.ResetPass.value.newPassword !==
      this.ResetPass.value.confirmPassword) {
      alert('Passwords do not match');
    }
    else {
      this.model = {
        currentPassword: this.ResetPass.value.currentPassword,
        newPassword: this.ResetPass.value.newPassword };

      this.editUserService.editStandardPassword(this.model).subscribe(resp => {
        alert(resp);
      }, error => {
          alert(error.error);
      });

      this.ResetPass.reset();
   }
 }

  initForm() {
    this.ResetPass = new FormGroup({
      currentPassword: new FormControl(''),
      newPassword: new FormControl(''),
      confirmPassword: new FormControl('')
    });
  }

  getNullError() {
    return this.nullError;
  }
}
