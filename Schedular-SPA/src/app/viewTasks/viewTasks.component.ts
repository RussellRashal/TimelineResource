import { Pagination } from './../_models/pagination';
import { TaskSchedule } from './../_models/taskSchedule';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TaskScheduleService } from '../_services/taskSchedule.service';
import { UpdateTaskComponent } from '../updateTask/updateTask.component';
import { MatDialog } from '@angular/material/dialog';
import { StateStorageService } from '../_services/stateStorage.service';

@Component({
  selector: 'app-viewtasks',
  templateUrl: './viewTasks.component.html',
  styleUrls: ['./viewTasks.component.css']
})
export class ViewTasksComponent implements OnInit {
  profileForm: FormGroup;
  userAuthorised: boolean;
  currentUser;
  role;
  UserMemberModels;
  isDataAvailable: boolean;
  taskScheduleData;
  notesArray;
  currentStartTimeDate;
  currentEndTimeDate;
  currentUserId;
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 5;

  constructor(
    private taskScheduleService: TaskScheduleService,
    private stateStorageService: StateStorageService,
    private route: ActivatedRoute,
    public dialog: MatDialog) {
      this.openCloseTasks(false);
    }

  ngOnInit() {
    this.isDataAvailable = false;

    // this.initialiseForm();
  }

  initialiseForm() {
    this.profileForm = new FormGroup({
      userId: new FormControl(this.currentUser.id),
      userCurrentAssigned: new FormControl(),
      startDate: new FormControl(new Date().toISOString().slice(0, 10)),
      endDate: new FormControl(new Date().toISOString().slice(0, 10))
    });
  }

  openCloseTasks(isClosed: boolean) {
      this.currentUser = JSON.parse(localStorage.getItem('user'));
      this.taskScheduleService.getTaskScheduleOpenCloseByUserId(this.currentUser.id, isClosed, this.pageNumber, this.pageSize)
      .subscribe((data) => {
        this.taskScheduleData = data.result;       // get jason data
        this.pagination = data.pagination; // get pagination data
        console.log('below is taskscheduldata');
        console.log(this.taskScheduleData);
        this.isDataAvailable = true;
      });
  }

  allTasks()  {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.taskScheduleService.getTaskScheduleByUserId(this.currentUser.id).subscribe((data) => {
      this.taskScheduleData = data;
      // console.log(this.taskScheduleData);
      this.isDataAvailable = true;
    });
  }

  updateDialog(taskId) {
    this.stateStorageService.setTaskId(taskId);
    const dialogRef = this.dialog.open(UpdateTaskComponent, {
      width: '80%',
      height: '90%'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.openCloseTasks(false);
    });
  }


  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  loggedOut() {
    const token = localStorage.removeItem('token');
    console.log('logged out');
  }
}
