import { TaskSchedule } from './../_models/taskSchedule';
import { Injectable } from '@angular/core';
import { UserMemberModel } from '../_models/UserMemberModel';
import { endWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateStorageService {
  taskId: number;
  customerId: number;
  userMembers: [];
  currentClickedUser: UserMemberModel[];
  attachmentFileName: [];


  constructor() { }
  // tasks details for updateTask component
  getTaskId() {
    return this.taskId;
  }
  setTaskId(taskIdIn) {
    this.taskId = taskIdIn;
  }

  // customer
  getCustomerId() {
    return this.customerId;
  }
  setCustomerId(customerId) {
    this.customerId = customerId;
  }

  // get attachment fileName from task
  getAttachmentFileName() {
    return this.attachmentFileName;
  }
  setAttachmentFileName(attachment) {
    this.attachmentFileName = attachment;
  }

  // staff member clicked on for addTask component without needing to make another api call
  setClickedOnUser(ClickedUser) {
    this.currentClickedUser = ClickedUser;
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
