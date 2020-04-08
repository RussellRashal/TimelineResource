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




  constructor() { }

  ngOnInit() {}

}
