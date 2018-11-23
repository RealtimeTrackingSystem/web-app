import { ChangePasswordComponent, MyProfileComponent } from './../../profile';
import { HostListViewComponent } from './host-list-view/host-list-view.component';
import { Routes } from '@angular/router';
import { DashboardComponent } from './../../dashboard/dashboard.component';
import { NewHostViewComponent } from './new-host-view/new-host-view.component';
import { NewReportViewComponent } from './new-report-view/new-report-view.component';

export const PublicRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'host-list',
        component: HostListViewComponent
      },
      {
        path: 'host-new',
        component: NewHostViewComponent
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
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
