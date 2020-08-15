import { HoursWorkedComponent } from './HoursWorked/HoursWorked.component';
import { TaskSchedule } from './_models/taskSchedule';
import { TestTaskComponent } from './TestTask/TestTask.component';
import { Routes } from '@angular/router';
import { CalendarViewComponent } from './CalendarView/CalendarView.component';
import { AddTaskComponent } from './addTask/addTask.component';
import { UpdateTaskComponent } from './updateTask/updateTask.component';
import { StaffLoaderResolver } from './_resolvers/staff-loader.resolver';
import { SidebarComponent } from './sidebar/sidebar.component';

export const appRoutes: Routes = [
    { path: 'testtask', component: TestTaskComponent},
    { path: 'addtask', component: AddTaskComponent},
    { path: 'updatetask', component: UpdateTaskComponent},
    { path: 'hoursworked', component: HoursWorkedComponent},
    { path: 'CalendarView', component: CalendarViewComponent},
    { path: '', redirectTo: 'cal', pathMatch: 'full'}
];



