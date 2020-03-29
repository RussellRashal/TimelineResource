import { TestTaskComponent } from './TestTask/TestTask.component';
import { Routes } from '@angular/router';
import { CalendarViewComponent } from './CalendarView/CalendarView.component';
import { AddTaskComponent } from './addTask/addTask.component';
import { UpdateTaskComponent } from './updateTask/updateTask.component';
import { StaffLoaderResolver } from './_resolvers/staff-loader.resolver';

export const appRoutes: Routes = [
    { path: 'cal', component: CalendarViewComponent,
        resolve: {StaffMemberModels: StaffLoaderResolver}},
    { path: 'TestTask', component: TestTaskComponent,
        resolve: {StaffMemberModels: StaffLoaderResolver}},
    { path: 'addTask', component: AddTaskComponent},
    { path: 'updateTask', component: UpdateTaskComponent},
    { path: '', redirectTo: 'cal', pathMatch: 'full'}
];



