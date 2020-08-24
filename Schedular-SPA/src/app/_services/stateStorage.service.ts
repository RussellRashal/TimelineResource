import { TaskSchedule } from './../_models/taskSchedule';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateStorageService {
  idOfClickedTask: TaskSchedule[];
  currentStaffData: [];
  staffMembers: [];


constructor() { }

// both the getters are needed to the uploadTask component.
gettaskScheduleDataStorage() {
  return this.idOfClickedTask;
}
getCurrentStaffDataStorage() {
  return this.currentStaffData;
}

// set the taskScheduleData and the currentStaffData
setStateStorage(idOfClickedTask, currentStaff) {
  this.idOfClickedTask = idOfClickedTask;
  this.currentStaffData = currentStaff;
}

// storage of staff member to use in updateTask component
// the data is coming from sidebar.component and it sends all staff names and data
setStaffMemberStorage(sidebarstaffMembers) {
  this.staffMembers = sidebarstaffMembers;
}

getStaffMemberStorage() {
  return this.staffMembers;
}

}
