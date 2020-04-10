import { StaffMemberModel } from './../_models/StaffMemberModel';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StateStorageService } from '../_services/stateStorage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  staffMemberModelsResolve: StaffMemberModel[];
  // goes to the calendar view for sharing data between components
  // <app-sidebar (StaffButtonClick)="runCalendarData($event)">
  @Output() StaffButtonClick = new EventEmitter<number>();

  constructor(
    private route: ActivatedRoute,
    private stateStorageService: StateStorageService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.staffMemberModelsResolve = data['StaffMemberModels'];
    });
    // to allow for use in the update component
    this.stateStorageService.setStaffMemberStorage(this.staffMemberModelsResolve);
    // console.log(this.staffMemberModelsResolve);
  }

  // to emit into the calendarView component
  sendStaffButtonClick(id) {
    this.StaffButtonClick.emit(id);
  }
}
