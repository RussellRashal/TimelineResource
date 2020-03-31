import { TaskSchedule } from './../_models/taskSchedule';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateStorageService {
  taskScheduleData: TaskSchedule[];
  currentStaffData: [];
  staffMember: [];


constructor() { }

// both the getters are needed to the uploadTask component. 
gettaskScheduleDataStorage() {
  return this.taskScheduleData;
}
getCurrentStaffDataStorage() {
  return this.currentStaffData;
}

// set the taskScheduleData and the currentStaffData
setStateStorage(CalendartaskSchedule, currentStaff) {
  this.taskScheduleData = CalendartaskSchedule;
  this.currentStaffData = currentStaff;
}

// storage of staff member to use in updateTask component
setStaffMemberStorage(sidebarstaffMember) {
  this.staffMember = sidebarstaffMember;
}

getStaffMemberStorage() {
  return this.staffMember;
}

}
