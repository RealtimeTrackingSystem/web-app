import { AnayliticsComponent } from './anaylitics/anaylitics.component';
import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ReportsTableViewComponent } from './reports-table-view/reports-table-view.component';
import { ReportDetailViewComponent } from './report-detail-view/report-detail-view.component';
import { PendingHostRequestViewComponent } from './pending-host-request-view/pending-host-request-view.component';
import { ChangePasswordComponent, MyProfileComponent } from './../../profile';
import { ReportCountComponent } from 'app/analytics';

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
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'analytics',
    pathMatch: 'full'
  }
];
