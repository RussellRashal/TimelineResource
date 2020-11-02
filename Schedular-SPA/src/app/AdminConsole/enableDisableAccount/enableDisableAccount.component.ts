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
  enabledAccounts;
  disabledAccounts;


  constructor(
    private editUserService: EditUserService
  ) { }

  ngOnInit() {
    this.retrieveAllEnabledAccounts();
    this.retrieveAllDisabledAccounts();

  }

  retrieveAllEnabledAccounts() {
    this.editUserService.allEnabledAccounts().subscribe((data) => {
      this.enabledAccounts = data;
      // console.log(this.enabledAccounts.username);
    }, error => {
        console.log(error);
    });
  }

  retrieveAllDisabledAccounts() {
    this.editUserService.allDisabledAccounts().subscribe((data) => {
      this.disabledAccounts = data;
    }, error => {
        console.log(error);
    });
  }

  enableAccountButton(username) {
    this.edituser = {
      CurrentUserName: username
    };
    this.editUserService.enableAccount(this.edituser).subscribe(resp  => {
      alert(resp);
      this.ngOnInit();
    }, error => {
      alert(error.error);
    });
  }

  disableAccountButton(username) {
    if (confirm('Are you sure you want to disable this user. If this user is disabled ' +
      'you will not be able to activate this user for another 120 days')) {
      this.edituser = {
        CurrentUserName: username
      };
      this.editUserService.disableAccount(this.edituser).subscribe(resp  => {
        this.ngOnInit();
        alert(resp);
      }, error => {
        alert(error.error);
      });
    }
  }
}
