import { EditRoleComponent } from './editRole/editRole.component';
import { EditAdminComponent } from './editAdmin/editAdmin.component';
import { RoleGuard } from './_guards/role.guard';
import { Component } from '@angular/core';
import { taskScheduleResolver } from './_resolvers/taskSchedule.resolver';
import { NoteComponent } from './note/note.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_guards/auth.guard';
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
        path: 'CalendarView',
        component: CalendarViewComponent, canActivate: [AuthGuard],
        resolve: { UserMemberModel: UserLoaderResolver }
    },
    // {
    //     path: 'updateTask/:id',
    //     component: UpdateTaskComponent, canActivate: [AuthGuard],
    //     resolve: {taskSchedule: taskScheduleResolver}
    // },
    // {
    //     path: 'testtask',
    //     component: TestTaskComponent,
    //     canActivate: [AuthGuard]
    // },
    // { path: 'addtask', component: AddTaskComponent},
    // { path: 'updatetask', component: UpdateTaskComponent},
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [RoleGuard]
    },
    {
        path: 'edit',
        component: EditAdminComponent,
        canActivate: [RoleGuard]
    },
    {
        path: 'editRole',
        component: EditRoleComponent,
        canActivate: [RoleGuard]
    },
    {
        path: 'hoursworked',
        component: HoursWorkedComponent,
        canActivate: [AuthGuard],
        resolve: {
            UserMemberModel: UserLoaderResolver,
            CurrentUser: stateStorageResolver
        }
    },
    {
        path: 'login',
        component: LoginPageComponent
    }
    // { path: '', redirectTo: 'login', pathMatch: 'full'}
];



