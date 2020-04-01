import { StaffMemberModel } from '../_models/StaffMemberModel';
import { TaskSchedule } from './../_models/taskSchedule';
import { Component, OnInit } from '@angular/core';
import { TaskScheduleService } from '../../app/_services/taskSchedule.service';
import { StaffMemberService } from '../_services/staffMember.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-testtask',
  templateUrl: './TestTask.component.html',
  styleUrls: ['./TestTask.component.css']
})
export class TestTaskComponent implements OnInit {
  time = {hour: 13, minute: 30};
  taskSchedule: TaskSchedule[];
  staffMemberModels: StaffMemberModel[];
  minuteSelector: string[] = [];
  hourSelector: number[] = [];



  constructor(
    private taskScheduleService: TaskScheduleService,
    private staffMemberService: StaffMemberService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    for (let i = 1; i < 60; i++) {
      if (i < 10) {
        this.minuteSelector[i] = '0' + i.toString();
      } else {
        this.minuteSelector[i] = i.toString();
      }
    }
    // hour creation
    for (let i = 1; i < 13; i++) {
      if (i < 10) {
        this.minuteSelector[i] = '0' + i.toString();
      } else {
      this.hourSelector[i] = i;
      }
    }
    console.log(this.minuteSelector);
    console.log(this.hourSelector);
  }






    // this will load the staff members
  loadStaffSchedule() {
    this.staffMemberService.getStaffs().subscribe((staffMemberModel: StaffMemberModel[]) => {
      this.staffMemberModels = staffMemberModel;
      // console.log(staffMemberModel);
    }, error => {
      console.log(error);
    });
  }


  // this will load the tasks associated with the staff members id
  loadUserTaskSchedule(id) {
    this.taskScheduleService.getTaskSchedulesByStaffId(id).subscribe((taskSchedule: TaskSchedule[]) => {
      this.taskSchedule = taskSchedule;
      // console.log(taskSchedule);
    }, error => {
      console.log(error);
    });
  }

}

