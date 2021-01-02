import { ViewTasksComponent } from './viewTasks/viewTasks.component';
import { NumberClosedTasksByUserComponent } from './ReportFolder/numberClosedTasksByUser/numberClosedTasksByUser.component';
import { HighPriorityComponent } from './ReportFolder/HighPriority/HighPriority.component';
import { CustomerTasksComponent } from './ReportFolder/CustomerTasks/CustomerTasks.component';
import { CustomerComponent } from './CustomerFolder/Customer/Customer.component';
import { UnlockAccountComponent } from './AdminConsole/unlockAccount/unlockAccount.component';
import { StandardUserPasswordComponent } from './StandardUserPassword/StandardUserPassword.component';
import { AttachmentComponent } from './Attachment/Attachment.component';
import { AdminConsoleNavComponent } from './AdminConsole/adminConsole-nav/adminConsole-nav.component';
import { EditRoleComponent } from './AdminConsole/editRole/editRole.component';
import { EditUsernameComponent } from './AdminConsole/editUsername/editUsername.component';
import { RegisterComponent } from './AdminConsole/register/register.component';
import { RoleGuard } from './_guards/role.guard';
import { AuthGuard } from './_guards/auth.guard';
import { stateStorageResolver } from './_resolvers/state-storage.resolver';
import { Routes } from '@angular/router';
import { CalendarViewComponent } from './CalendarView/CalendarView.component';
import { UserLoaderResolver } from './_resolvers/user-loader.resolver';
import { LoginPageComponent } from './loginPage/loginPage.component';
import { PasswordResetComponent } from './AdminConsole/passwordReset/passwordReset.component';
import { EnableDisableAccountComponent } from './AdminConsole/enableDisableAccount/enableDisableAccount.component';
import { HoursWorkedComponent } from './ReportFolder/HoursWorked/HoursWorked.component';
import { TimelineComponent } from './Timeline/Timeline.component';


export const appRoutes: Routes = [
    {
        path: 'CalendarView',
        component: CalendarViewComponent, canActivate: [AuthGuard],
        resolve: { UserMemberModel: UserLoaderResolver }
    },
    {
        path: 'viewTask',
        component: ViewTasksComponent, canActivate: [AuthGuard],
        resolve: { UserMemberModel: UserLoaderResolver }
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [RoleGuard]
    },
    {
        path: 'Timeline',
        component: TimelineComponent,
        canActivate: [RoleGuard]
    },
    {
        path: 'editUsername',
        component: EditUsernameComponent,
        canActivate: [RoleGuard],
        resolve: {
            UserMemberModel: UserLoaderResolver
        }
    },
    {
        path: 'editRole',
        component: EditRoleComponent,
        canActivate: [RoleGuard],
        resolve: {
            UserMemberModel: UserLoaderResolver
        }
    },
    {
        path: 'Password',
        component: PasswordResetComponent,
        canActivate: [RoleGuard],
        resolve: {
            UserMemberModel: UserLoaderResolver
        }
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
        component: UnlockAccountComponent , canActivate: [RoleGuard],
        resolve: {
            UserMemberModel: UserLoaderResolver,
        }
    },
    {
        path: 'EnableDisableAccountComponent',
        component: EnableDisableAccountComponent , canActivate: [RoleGuard]
    },
    {
        path: 'CustomerComponent',
        component: CustomerComponent , canActivate: [AuthGuard]
    },
    {
        path: 'CustomerTask',
        component: CustomerTasksComponent , canActivate: [RoleGuard]
    },
    {
        path: 'HighPriority',
        component: HighPriorityComponent , canActivate: [RoleGuard]
    },
    {
        path: 'NumberClosedTasksByUser',
        component: NumberClosedTasksByUserComponent , canActivate: [RoleGuard]
    },
    {
        path: 'login',
        component: LoginPageComponent
    }
    // { path: '', redirectTo: 'login', pathMatch: 'full'}
];





