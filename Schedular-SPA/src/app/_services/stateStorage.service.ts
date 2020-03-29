import { TaskSchedule } from './../_models/taskSchedule';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateStorageService {
  taskScheduleWithStaffIdArray: [];


constructor() { }

getStateStorage() {
  return this.taskScheduleWithStaffIdArray;
}

setStateStorage(taskScheduleWithStaffIdArray) {
  this.taskScheduleWithStaffIdArray = taskScheduleWithStaffIdArray;
}

}
