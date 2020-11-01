import { EditUserService } from './../../_services/editUser.service';
import { Component, OnInit } from '@angular/core';
import { StateStorageService } from 'src/app/_services/stateStorage.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-unlockaccount',
  templateUrl: './unlockAccount.component.html',
  styleUrls: ['./unlockAccount.component.css']
})
export class UnlockAccountComponent implements OnInit {
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

  unlockButton() {
    this.edituser = {
      CurrentUserName: this.username.value
    };
    this.editUserService.unlockAccount(this.edituser).subscribe(resp  => {
      this.ngOnInit();
      alert(resp);
    }, error => {
      console.log(error);
  });
  }


}
