import { Staff } from './../_models/staff';
import { TaskSchedule } from './../_models/taskSchedule';
import { Component, OnInit } from '@angular/core';
import { TaskScheduleService } from '../../app/_services/taskSchedule.service';
import { StaffService } from '../../app/_services/Staff.service';

@Component({
  selector: 'app-testtask',
  templateUrl: './TestTask.component.html',
  styleUrls: ['./TestTask.component.css']
})
export class TestTaskComponent implements OnInit {
  taskSchedule: TaskSchedule[];
  staff: Staff[];

  constructor(
    private taskScheduleService: TaskScheduleService,
    private staffService: StaffService) { }

  ngOnInit() {
    this.loadUserTaskSchedule(2);
  }

    // this will load the staff members
  loadStaffSchedule() {
    this.staffService.getStaff().subscribe((staff: Staff[]) => {
      this.staff = staff;
      console.log(staff);
    }, error => {
      console.log(error);
    });
  }


  // this will load the tasks associated with the staff members id
  loadUserTaskSchedule(id) {
    this.taskScheduleService.getTaskSchedulesByStaffId(id).subscribe((taskSchedule: TaskSchedule[]) => {
      this.taskSchedule = taskSchedule;
      console.log(taskSchedule);
    }, error => {
      console.log(error);
    });
  }

}
