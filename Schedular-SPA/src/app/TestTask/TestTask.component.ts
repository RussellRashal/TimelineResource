import { TaskSchedule } from './../_models/taskSchedule';
import { Component, OnInit } from '@angular/core';
import { TaskScheduleService } from '../../app/_services/taskSchedule.service';

@Component({
  selector: 'app-testtask',
  templateUrl: './TestTask.component.html',
  styleUrls: ['./TestTask.component.css']
})
export class TestTaskComponent implements OnInit {
  taskSchedule: TaskSchedule[];

  constructor(
    private taskScheduleService: TaskScheduleService) { }

  ngOnInit() {
    this.loadTaskSchedule();
  }

  loadTaskSchedule() {
    this.taskScheduleService.getTaskSchedule().subscribe((taskSchedule: TaskSchedule[]) => {
      this.taskSchedule = taskSchedule;
      console.log(taskSchedule);
    }, error => {
      console.log(error);
    });
  }

}
