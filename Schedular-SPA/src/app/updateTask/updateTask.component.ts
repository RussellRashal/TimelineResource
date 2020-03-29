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
  taskScheduleWithStaffIdArray: [];

  constructor(
    private router: Router,
    private stateStorageService: StateStorageService) {}




  ngOnInit() {
    this.taskScheduleWithStaffIdArray = this.stateStorageService.getStateStorage();
    console.log(this.taskScheduleWithStaffIdArray);

    // console.log(idOfClickedTask.event.id);
    // console.log(idOfClickedTask.event.title);
    // console.log(idOfClickedTask.event.start);
    // console.log(idOfClickedTask.event.end);
    // console.log(this.idOfStaffForeignKeyToTask);
  }


}


