import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { HostJoinedViewComponent } from './host-joined-view/host-joined-view.component';

export const AdminRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'host-joined',
        component: HostJoinedViewComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
