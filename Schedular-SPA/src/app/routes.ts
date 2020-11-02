import { UnlockAccountComponent } from './AdminConsole/unlockAccount/unlockAccount.component';
import { StandardUserPasswordComponent } from './StandardUserPassword/StandardUserPassword.component';
import { AttachmentComponent } from './Attachment/Attachment.component';
import { AdminConsoleNavComponent } from './AdminConsole/adminConsole-nav/adminConsole-nav.component';
import { ViewTasksComponent } from './viewTasks/viewTasks.component';
import { EditRoleComponent } from './AdminConsole/editRole/editRole.component';
import { EditUsernameComponent } from './AdminConsole/editUsername/editUsername.component';
import { RegisterComponent } from './AdminConsole/register/register.component';
import { RoleGuard } from './_guards/role.guard';
import { Component } from '@angular/core';
import { taskScheduleResolver } from './_resolvers/taskSchedule.resolver';
import { NoteComponent } from './note/note.component';
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
import { PasswordResetComponent } from './AdminConsole/passwordReset/passwordReset.component';
import { EnableDisableAccountComponent } from './AdminConsole/enableDisableAccount/enableDisableAccount.component';


export const appRoutes: Routes = [
    {
        path: 'CalendarView',
        component: CalendarViewComponent, canActivate: [AuthGuard],
        resolve: { UserMemberModel: UserLoaderResolver }
    },
    {
        path: 'viewTasks',
        component: ViewTasksComponent, canActivate: [AuthGuard],
        resolve: { UserMemberModel: UserLoaderResolver }
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [RoleGuard]
    },
    {
        path: 'editUsername',
        component: EditUsernameComponent,
        canActivate: [RoleGuard]
    },
    {
        path: 'editRole',
        component: EditRoleComponent,
        canActivate: [RoleGuard]
    },
    {
        path: 'Password',
        component: PasswordResetComponent,
        canActivate: [RoleGuard]
    },
    {
        path: 'SideNav',
        component: AdminConsoleNavComponent,
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
        path: 'AttachmentComponent',
        component: AttachmentComponent
    },
    {
        path: 'StandardPassword',
        component: StandardUserPasswordComponent , canActivate: [AuthGuard]
    },
    {
        path: 'UnlockAccount',
        component: UnlockAccountComponent , canActivate: [RoleGuard]
    },
    {
        path: 'EnableDisableAccountComponent',
        component: EnableDisableAccountComponent , canActivate: [RoleGuard]
    },
    {
        path: 'login',
        component: LoginPageComponent
    }
    // { path: '', redirectTo: 'login', pathMatch: 'full'}
];





