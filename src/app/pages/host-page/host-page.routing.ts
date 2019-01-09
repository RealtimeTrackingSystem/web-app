import { AnayliticsComponent } from './anaylitics/anaylitics.component';
import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ReportsTableViewComponent } from './reports-table-view/reports-table-view.component';
import { ReportDetailViewComponent } from './report-detail-view/report-detail-view.component';
import { PendingHostRequestViewComponent } from './pending-host-request-view/pending-host-request-view.component';
import { ChangePasswordComponent, MyProfileComponent } from './../../profile';
import { ReportCountComponent } from 'app/analytics';
import { RegisterUserViewComponent } from './register-user-view/register-user-view.component';
import { MembersListViewComponent } from './members-list-view/members-list-view.component';
import { SuspectListViewComponent } from './suspect-list-view/suspect-list-view.component';

export const HostRoutes: Routes = [
  { path: '', redirectTo: 'analytics', pathMatch: 'full' },
  {
    path: '',
    children: [
      {
        path: 'analytics',
        component: AnayliticsComponent
      },
      {
        path: 'reports/table',
        component: ReportsTableViewComponent
      },
      {
        path: 'reports/map',
        component: DashboardComponent
      },
      {
        path: 'reports/suspects',
        component: SuspectListViewComponent
      },
      {
        path: 'reports/details/:_reportId',
        component: ReportDetailViewComponent
      },
      {
        path: 'requests',
        component: PendingHostRequestViewComponent
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent
      },
      {
        path: 'my-profile',
        component: MyProfileComponent
      },
      {
        path: 'register-users',
        component: RegisterUserViewComponent
      },
      {
        path: 'view-members',
        component: MembersListViewComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'analytics',
    pathMatch: 'full'
  }
];
