import { TestTaskComponent } from './TestTask/TestTask.component';
import { Routes } from '@angular/router';
import { CalendarViewComponent } from './CalendarView/CalendarView.component';
import { AddTaskComponent } from './addTask/addTask.component';
import { UpdateTaskComponent } from './updateTask/updateTask.component';

export const appRoutes: Routes = [
    { path: 'cal', component: CalendarViewComponent},
    { path: 'TestTask', component: TestTaskComponent},
    { path: 'addTask', component: AddTaskComponent},
    { path: 'updateTask', component: UpdateTaskComponent}
    // { path: '**', redirectTo: 'TaskDisplay', pathMatch: 'full'}
];
