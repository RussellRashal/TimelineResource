import { StaffMemberModel } from '../_models/StaffMemberModel';
import { TaskSchedule } from './../_models/taskSchedule';
import { Component, OnInit } from '@angular/core';
import { TaskScheduleService } from '../../app/_services/taskSchedule.service';
import { StaffMemberService } from '../_services/staffMember.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StateStorageService } from '../_services/stateStorage.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-testtask',
  templateUrl: './TestTask.component.html',
  styleUrls: ['./TestTask.component.css']
})
export class TestTaskComponent implements OnInit {
  profileForm: FormGroup;
  taskId;
  taskSchedule: any[];
  // taskSchedule: any = {};


  constructor(
    private route: ActivatedRoute,
    private stateStorageService: StateStorageService,
    private taskScheduleService: TaskScheduleService,
    private router: Router) { }

  ngOnInit() {

  }

  // getData() {
  //   // this.taskId = this.stateStorageService.getCurrentTaskId();

  //   this.taskScheduleService.getTaskSchedule(this.taskId).subscribe(data => {
  //     this.taskSchedule = data;
  //     console.log(this.taskSchedule.title);
  //   });
  // }
}
