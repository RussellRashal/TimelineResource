import { Pagination } from './../_models/pagination';
import { TaskSchedule } from './../_models/taskSchedule';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TaskScheduleService } from '../_services/taskSchedule.service';
import { UpdateTaskComponent } from '../updateTask/updateTask.component';
import { MatDialog } from '@angular/material/dialog';
import { StateStorageService } from '../_services/stateStorage.service';
import { AddTaskComponent } from '../addTask/addTask.component';
import { environment } from 'src/environments/environment';



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
  selectedbutton;
  taskScheduleData;
  notesArray;
  currentStartTimeDate;
  currentEndTimeDate;
  currentUserId;
  searchTask: FormControl;
  selectedFullName;
  customerType: string = environment.customerType;



  pagination: Pagination;
  pageNumber = 1;
  pageSize = 10;


  constructor(
    private taskScheduleService: TaskScheduleService,
    private stateStorageService: StateStorageService,
    private route: ActivatedRoute,
    public dialog: MatDialog) {
      // initally load the logged in users tasks
      this.currentUser = JSON.parse(localStorage.getItem('user'));
      this.selectedFullName = this.currentUser.firstName + ' ' + this.currentUser.lastName;
      this.openCloseTasks(false);
    }

  ngOnInit() {
    this.isDataAvailable = false;
    this.searchTask = new FormControl();
    this.selectedbutton = 'Open Tasks';
  }


  changeUserTasks(CurrentUser) {
    this.currentUser = CurrentUser;
    this.selectedFullName = this.currentUser.firstName + ' ' + this.currentUser.lastName;
    this.openTaskButton();
  }

  openTaskButton() {
    console.log('openTaskButton()');
    this.pagination.currentPage = 1; // reset page number back to 1 when button is clicked
    this.selectedbutton = 'Open Tasks';
    this.openCloseTasks(false);
  }

  closeTaskButton() {
    this.pagination.currentPage = 1; // reset page number back to 1 when button is clicked
    this.selectedbutton = 'Closed Tasks';
    this.openCloseTasks(true);
  }

  allTaskButton() {
    this.pagination.currentPage = 1; // reset page number back to 1 when button is clicked
    this.selectedbutton = 'All Tasks';
    this.allTasks();
  }

  highOpenTaskButton() {
    this.pagination.currentPage = 1; // reset page number back to 1 when button is clicked
    this.selectedbutton = 'High Open Tasks';
    this.priorityOpenCloseTasks(false, true);
  }

  highCloseTaskButton() {
    this.pagination.currentPage = 1; // reset page number back to 1 when button is clicked
    this.selectedbutton = 'High Closed Tasks';
    this.priorityOpenCloseTasks(true, true);
  }

  normalOpenTaskButton() {
    this.pagination.currentPage = 1; // reset page number back to 1 when button is clicked
    this.selectedbutton = 'Normal Open Tasks';
    this.priorityOpenCloseTasks(false, false);
  }

  normalCloseTaskButton() {
    this.pagination.currentPage = 1; // reset page number back to 1 when button is clicked
    this.selectedbutton = 'Normal Closed Tasks';
    this.priorityOpenCloseTasks(true, false);
  }


  priorityOpenCloseTasks(isClosed: boolean, HighPriority: boolean) {
    this.taskScheduleService.GetHighPriorityOpenCloseTasksByUser
      (this.currentUser.id, isClosed, HighPriority, this.pageNumber, this.pageSize)
    .subscribe((data) => {
      this.taskScheduleData = data.result; // get jason data
      this.pagination = data.pagination;   // get pagination data
      this.isDataAvailable = true;
    });
  }

  openCloseTasks(isClosed: boolean) {
      this.taskScheduleService.getTaskScheduleOpenCloseByUserId
        (this.currentUser.id, isClosed, this.pageNumber, this.pageSize)
      .subscribe((data) => {
        this.taskScheduleData = data.result; // get jason data
        this.pagination = data.pagination;   // get pagination data
        this.isDataAvailable = true;
      });
  }

  allTasks()  {
    this.selectedbutton = 'All Tasks';
    this.taskScheduleService.getTaskScheduleByUserId(this.currentUser.id, this.pageNumber, this.pageSize)
    .subscribe((data) => {
      this.taskScheduleData = data.result; // get jason data
      this.pagination = data.pagination;   // get pagination data
      this.isDataAvailable = true;
    });
  }

  openDialogAddTask() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '80%',
      height: '60%'
    });
    dialogRef.afterClosed().subscribe(result => {
       this.allTasks();
    });
  }


  pageChanged(event: any) {
    this.pageNumber = event.page;
    console.log('pagedChanged even triggered');

    switch (this.selectedbutton) {
      case 'Open Tasks':
        this.openCloseTasks(false);
        break;
      case 'Closed Tasks':
        this.openCloseTasks(true);
        break;
      case 'High Open Tasks':
        this.priorityOpenCloseTasks(false, true);
        break;
      case 'High Closed Tasks':
        this.priorityOpenCloseTasks(true, true);
        break;
      case 'Normal Open Tasks':
        this.priorityOpenCloseTasks(false, false);
        break;
      case 'Normal Closed Tasks':
        this.priorityOpenCloseTasks(true, false);
        break;
      default:
        this.allTasks();
        break;
    }
  }



  updateDialog(taskId) {
    this.stateStorageService.setTaskId(taskId);
    const dialogRef = this.dialog.open(UpdateTaskComponent, {
      width: '80%',
      height: '90%'
    });
    dialogRef.afterClosed().subscribe(result => {
      switch (this.selectedbutton) {
        case 'Open Tasks':
          this.openCloseTasks(false);
          break;
        case 'Closed Tasks':
          this.openCloseTasks(true);
          break;
        case 'High Open Tasks':
          this.priorityOpenCloseTasks(false, true);
          break;
        case 'High Closed Tasks':
          this.priorityOpenCloseTasks(true, true);
          break;
        case 'Normal Open Tasks':
          this.priorityOpenCloseTasks(false, false);
          break;
        case 'Normal Closed Tasks':
          this.priorityOpenCloseTasks(true, false);
          break;
        default:
          this.allTasks();
          break;
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
      switch (this.selectedbutton) {
        case 'Open Tasks':
          this.openCloseTasks(true);
          break;
        case 'Closed Tasks':
          this.openCloseTasks(false);
          break;
        case 'High Open Tasks':
          this.priorityOpenCloseTasks(false, true);
          break;
        case 'High Closed Tasks':
          this.priorityOpenCloseTasks(true, true);
          break;
        case 'Normal Open Tasks':
          this.priorityOpenCloseTasks(false, false);
          break;
        case 'Normal Closed Tasks':
          this.priorityOpenCloseTasks(true, false);
          break;
        default:
          this.allTasks();
          break;
      }
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
