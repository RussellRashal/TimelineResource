import { Component, OnInit } from '@angular/core';
import { StateStorageService } from 'src/app/_services/stateStorage.service';
import { EditUserService } from './../../_services/editUser.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-enabledisableaccount',
  templateUrl: './enableDisableAccount.component.html',
  styleUrls: ['./enableDisableAccount.component.css']
})
export class EnableDisableAccountComponent implements OnInit {
  userMemberModels;
  username: FormControl;
  edituser;

  constructor(
    private stateStorageService: StateStorageService,
    private editUserService: EditUserService
  ) { }

  ngOnInit() {
    this.userMemberModels = this.stateStorageService.getUserMemberStorage();
    this.username = new FormControl();
  }

  enableAccountButton() {
    this.edituser = {
      CurrentUserName: this.username.value
    };
    this.editUserService.enableAccount(this.edituser).subscribe(resp  => {
      this.ngOnInit();
      alert(resp);
    }, error => {
      console.log(error);
    });
  }

  disableAccountButton() {
    this.edituser = {
      CurrentUserName: this.username.value
    };
    this.editUserService.enableAccount(this.edituser).subscribe(resp  => {
      this.ngOnInit();
      alert(resp);
    }, error => {
      console.log(error);
    });
  }
}
