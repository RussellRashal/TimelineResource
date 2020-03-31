import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateStorageService } from '../_services/stateStorage.service';
import { TaskSchedule } from '../_models/taskSchedule';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-task',
  templateUrl: './updateTask.component.html',
  styleUrls: ['./updateTask.component.css']
})

export class UpdateTaskComponent implements OnInit {
  taskScheduleData: TaskSchedule[];
  currentUserData: [];
  StaffMemberModels: [];
  currentStartTimeDate;
  currentEndTimeDate;
  startDateConvert;
  endDateConvert;


  constructor(
    private router: Router,
    private stateStorageService: StateStorageService,
    private datePipe: DatePipe) {}


  ngOnInit() {
    this.taskScheduleData = this.stateStorageService.gettaskScheduleDataStorage();
    this.currentUserData = this.stateStorageService.getCurrentStaffDataStorage();
    this.StaffMemberModels = this.stateStorageService.getStaffMemberStorage();

    this.currentStartTimeDate = this.taskScheduleData.event.start;
    this.currentEndTimeDate = this.taskScheduleData.event.end;
    this.transformDate();
    console.log(this.startDateConvert);
    console.log(this.endDateConvert);

  }

  transformDate() {
    this.startDateConvert = this.datePipe.transform(this.currentStartTimeDate, 'yyyy-MM-dd');
    this.endDateConvert = this.datePipe.transform(this.currentEndTimeDate, 'yyyy-MM-dd');
  }


}


