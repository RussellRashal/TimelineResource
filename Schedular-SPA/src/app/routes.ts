import { UserMemberModel } from './_models/UserMemberModel';
import { stateStorageResolver } from './_resolvers/state-storage.resolver';
import { HoursWorkedComponent } from './HoursWorked/HoursWorked.component';
import { TaskSchedule } from './_models/taskSchedule';
import { TestTaskComponent } from './TestTask/TestTask.component';
import { Routes } from '@angular/router';
import { CalendarViewComponent } from './CalendarView/CalendarView.component';
import { AddTaskComponent } from './addTask/addTask.component';
import { UpdateTaskComponent } from './updateTask/updateTask.component';
import { UserLoaderResolver } from './_resolvers/user-loader.resolver';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginPageComponent } from './loginPage/loginPage.component';

export const appRoutes: Routes = [
    {
        path: 'CalendarView', component: CalendarViewComponent,
        resolve: {
             UserMemberModel: UserLoaderResolver
        }
    },
    {
        path: 'testtask', component: TestTaskComponent
    },
    // { path: 'addtask', component: AddTaskComponent},
    // { path: 'updatetask', component: UpdateTaskComponent},
    {
        path: 'hoursworked', component: HoursWorkedComponent,
        resolve: {
            UserMemberModel: UserLoaderResolver,
            CurrentUser: stateStorageResolver
        }
    },
    {
        path: 'login', component: LoginPageComponent
    }
    // { path: '', redirectTo: 'login', pathMatch: 'full'}
];



