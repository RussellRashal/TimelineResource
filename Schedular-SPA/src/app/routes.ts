import { TestTaskComponent } from './TestTask/TestTask.component';
import { TaskDisplayComponent } from '../TaskDisplay/TaskDisplay.component';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    { path: 'TaskDisplay', component: TaskDisplayComponent},
    { path: 'TestTask', component: TestTaskComponent}
    // { path: '**', redirectTo: 'TaskDisplay', pathMatch: 'full'}
];
