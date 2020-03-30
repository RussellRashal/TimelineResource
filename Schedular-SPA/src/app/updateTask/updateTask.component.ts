import { StaffMemberModel } from './../_models/StaffMemberModel';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateStorageService } from '../_services/stateStorage.service';
import { TaskSchedule } from '../_models/taskSchedule';

@Component({
  selector: 'app-update-task',
  templateUrl: './updateTask.component.html',
  styleUrls: ['./updateTask.component.css']
})
export class UpdateTaskComponent implements OnInit {
  taskScheduleData: [];
  currentUserData: [];
  StaffMemberModels: [];

  constructor(
    private router: Router,
    private stateStorageService: StateStorageService) {}


  ngOnInit() {
    this.taskScheduleData = this.stateStorageService.gettaskScheduleDataStorage();
    this.currentUserData = this.stateStorageService.getCurrentStaffDataStorage();
    this.StaffMemberModels = this.stateStorageService.getStaffMemberStorage();
    console.log(this.taskScheduleData);
    console.log(this.currentUserData);
    console.log(this.StaffMemberModels);

    // console.log(idOfClickedTask.event.id);
    // console.log(idOfClickedTask.event.title);
    // console.log(idOfClickedTask.event.start);
    // console.log(idOfClickedTask.event.end);
    // console.log(this.idOfStaffForeignKeyToTask);
  }


}


