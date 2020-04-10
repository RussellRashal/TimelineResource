import { TaskSchedule } from './_models/taskSchedule';
import { TestTaskComponent } from './TestTask/TestTask.component';
import { Routes } from '@angular/router';
import { CalendarViewComponent } from './CalendarView/CalendarView.component';
import { AddTaskComponent } from './addTask/addTask.component';
import { UpdateTaskComponent } from './updateTask/updateTask.component';
import { StaffLoaderResolver } from './_resolvers/staff-loader.resolver';
import { FullCalendarComponent } from './FullCalendar/FullCalendar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TaskSchedularLoaderResolver } from './_resolvers/task-schedular-loader.resolver';

export const appRoutes: Routes = [
    { path: 'cal', component: CalendarViewComponent,
        resolve: {StaffMemberModels: StaffLoaderResolver}},
    { path: 'testTask', component: TestTaskComponent,
        resolve: {TaskSchedule: TaskSchedularLoaderResolver}},
    { path: 'addTask', component: AddTaskComponent},
    { path: 'updateTask', component: UpdateTaskComponent,
        resolve: {TaskSchedule: TaskSchedularLoaderResolver}},
    { path: 'fullcalendar', component: FullCalendarComponent},
    { path: '', redirectTo: 'cal', pathMatch: 'full'}
];



