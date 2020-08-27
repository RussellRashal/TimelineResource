import { TaskSchedule } from './../_models/taskSchedule';
import { Injectable } from '@angular/core';
import { StaffMemberModel } from '../_models/StaffMemberModel';
import { endWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateStorageService {
  taskSchedule: TaskSchedule[];
  currentStaffData: [];
  staffMembers: [];
  currentClickedStaff: StaffMemberModel[];


  constructor() { }
  // tasks details for updateTask component
  gettaskScheduleStorage() {
    return this.taskSchedule;
  }
  setTaskScheduleStorage(TaskScheduleSet) {
    this.taskSchedule = TaskScheduleSet;
  }




  // staff member clicked on for updateTask component
  setClickedOnStaffMember(currentCllickedStaff) {
    this.currentClickedStaff = currentCllickedStaff;
  }
  getClickedOnStaffMember() {
    return this.currentClickedStaff;
  }



  // storage of staff member to use in calendarView component from the sidebar component
  // the data is coming from sidebar.component and it sends all staff names and data
  setStaffMemberStorage(sidebarstaffMembers) {
    this.staffMembers = sidebarstaffMembers;
  }
  getStaffMemberStorage() {
    return this.staffMembers;
  }
}
