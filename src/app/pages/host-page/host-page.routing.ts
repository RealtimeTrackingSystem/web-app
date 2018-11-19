import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ReportsTableViewComponent } from './reports-table-view/reports-table-view.component';
import { ReportDetailViewComponent } from './report-detail-view/report-detail-view.component';
import { PendingHostRequestViewComponent } from './pending-host-request-view/pending-host-request-view.component';
import { ChangePasswordComponent } from './../../profile';

export const HostRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
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
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
