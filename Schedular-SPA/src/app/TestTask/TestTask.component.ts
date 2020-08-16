import { StaffMemberService } from './../_services/staffMember.service';
import { StaffMemberModel } from '../_models/StaffMemberModel';
import { TaskSchedule } from './../_models/taskSchedule';
import { Component, OnInit } from '@angular/core';
import { TaskScheduleService } from '../../app/_services/taskSchedule.service';
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
  staffmember: StaffMemberModel[];


  constructor(
    private route: ActivatedRoute,
    private stateStorageService: StateStorageService,
    private taskScheduleService: TaskScheduleService,
    private router: Router,
    private staffmemberService: StaffMemberService
    ) { }

  ngOnInit() {
    this.getStaff();
  }

  getStaff() {
    this.staffmemberService.getStaffs().subscribe((data) => {
      this.staffmember = data;
      // console.log(this.staffmember);
    });

  }

  testmethod() {
    this.staffmember = this.staffmemberService.getStaffs();
    console.log(this.staffmember);
  }

}
