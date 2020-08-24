import { StaffMemberService } from './../_services/staffMember.service';
import { StaffMemberModel } from '../_models/StaffMemberModel';
import { TaskSchedule } from './../_models/taskSchedule';
import { Component, OnInit } from '@angular/core';
import { TaskScheduleService } from '../../app/_services/taskSchedule.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StateStorageService } from '../_services/stateStorage.service';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-testtask',
  templateUrl: './TestTask.component.html',
  styleUrls: ['./TestTask.component.css']
})
export class TestTaskComponent implements OnInit {



  constructor( ) { }

  ngOnInit() {
    const currentUserLoggedIn = JSON.parse(localStorage.getItem('username'));
    const currentUserLoggedInId = JSON.parse(localStorage.getItem('id'));

    console.log('currently logged in as ' + currentUserLoggedIn);
    console.log('their id is ' + currentUserLoggedInId);
  }

}
