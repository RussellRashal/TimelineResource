import { UserMemberModel } from '../_models/UserMemberModel';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StateStorageService } from '../_services/stateStorage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  role;
  UserMemberModels;
  standardAccountUsers;
  // goes to the calendar view for sharing data between components
  // <app-sidebar (StaffButtonClick)="runCalendarData($event)">
  @Output() UserButtonClick = new EventEmitter<number>();

  constructor(
    private route: ActivatedRoute,
    private stateStorageService: StateStorageService) { }

  ngOnInit() {
    this.role = JSON.parse(localStorage.getItem('role'));

    if (this.role === 'Manager')
    {
      // list of users for the drop down
      this.route.data.subscribe(data => {
        this.UserMemberModels = data['UserMemberModel'];
        // to allow for use in the update component
        this.stateStorageService.setUserMemberStorage(this.UserMemberModels);
      });
    }
    else
    {
      this.route.data.subscribe(data => {
        this.standardAccountUsers = data['UserMemberModel'];
        this.stateStorageService.setUserMemberStorage(this.UserMemberModels);
      });
    }
  }

  // to emit into the calendarView component
  sendUserButtonClick(id) {
    console.log('button clicked');
    this.UserButtonClick.emit(id);
  }

}
