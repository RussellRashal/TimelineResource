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
  allTasksbutton: boolean;
  taskScheduleData;
  notesArray;
  currentStartTimeDate;
  currentEndTimeDate;
  currentUserId;
  openCloseValue: boolean;
  searchTask: FormControl;

  pagination: Pagination;
  pageNumber = 1;
  pageSize = 20;

  constructor(
    private taskScheduleService: TaskScheduleService,
    private stateStorageService: StateStorageService,
    private route: ActivatedRoute,
    public dialog: MatDialog) {
      this.openCloseTasks(false);
    }

  ngOnInit() {
    this.isDataAvailable = false;
    this.openCloseValue = false;
    this.searchTask = new FormControl();
  }

  openCloseTasks(isClosed: boolean) {
      this.allTasksbutton = false;
      this.openCloseValue = isClosed;
      this.currentUser = JSON.parse(localStorage.getItem('user'));
      this.taskScheduleService.getTaskScheduleOpenCloseByUserId
        (this.currentUser.id, isClosed, this.pageNumber, this.pageSize)
      .subscribe((data) => {
        this.taskScheduleData = data.result; // get jason data
        this.pagination = data.pagination;   // get pagination data
        this.isDataAvailable = true;
      });
  }


  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.openCloseTasks(this.openCloseValue);
  }

  allTasks()  {
    this.allTasksbutton = true;
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.taskScheduleService.getTaskScheduleByUserId(this.currentUser.id, this.pageNumber, this.pageSize)
    .subscribe((data) => {
      this.taskScheduleData = data.result; // get jason data
      this.pagination = data.pagination;   // get pagination data
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
      if (this.allTasksbutton === true) {
        this.allTasks();
      }
      else {
        this.openCloseTasks(this.openCloseValue);
      }
    });
  }

  searchTaskBox() {
    this.stateStorageService.setTaskId(this.searchTask.value);
    const dialogRef = this.dialog.open(UpdateTaskComponent, {
      width: '80%',
      height: '60%'
    });
    dialogRef.afterClosed().subscribe(result => {
       this.openCloseTasks(this.openCloseValue);
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
