import { TestTaskComponent } from './TestTask/TestTask.component';
import { Routes } from '@angular/router';
import { CalendarViewComponent } from './CalendarView/CalendarView.component';

export const appRoutes: Routes = [
    { path: 'cal', component: CalendarViewComponent},
    { path: 'TestTask', component: TestTaskComponent}
    // { path: '**', redirectTo: 'TaskDisplay', pathMatch: 'full'}
];
