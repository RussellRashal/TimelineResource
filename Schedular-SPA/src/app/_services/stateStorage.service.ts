import { TaskSchedule } from './../_models/taskSchedule';
import { Injectable } from '@angular/core';
import { UserMemberModel } from '../_models/UserMemberModel';
import { endWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateStorageService {
  taskSchedule: any[];
  userMembers: [];
  currentClickedUser: UserMemberModel[];


  constructor() { }
  // tasks details for updateTask component
  gettaskScheduleStorage() {
    return this.taskSchedule;
  }
  setTaskScheduleStorage(TaskScheduleSet) {
    this.taskSchedule = TaskScheduleSet;
  }


  // staff member clicked on for updateTask component
  setClickedOnUser(CllickedUser) {
    this.currentClickedUser = CllickedUser;
  }
  getClickedOnUser() {
    return this.currentClickedUser;
  }



  // storage of staff member to use in calendarView component from the sidebar component
  // the data is coming from sidebar.component and it sends all staff names and data
  setUserMemberStorage(sidebarUserMembers) {
    this.userMembers = sidebarUserMembers;
  }
  getUserMemberStorage() {
    return this.userMembers;
  }
}
