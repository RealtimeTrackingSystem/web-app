import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { HostLayoutComponent } from './layouts/host/host-layout.component';
import { PublicLayoutComponent } from './layouts/public/public-layout.component';

import { SessionGuard, AdminGuard, HostGuard } from './guards';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full',
      },
      {
        path: '',
        canActivate: [SessionGuard, AdminGuard],
        canActivateChild: [SessionGuard, AdminGuard],
        component: AdminLayoutComponent,
        children: [
          {
            path: 'admin',
            loadChildren: './pages/admin-page/admin-page.module#AdminPageModule'
          }
        ]
      },
      {
        path: '',
        canActivate: [SessionGuard, HostGuard],
        canActivateChild: [SessionGuard, HostGuard],
        component: HostLayoutComponent,
        children: [
          {
            path: 'host',
            loadChildren: './pages/host-page/host-page.module#HostPageModule'
          }
        ]
      },
      {
        path: '',
        canActivate: [SessionGuard],
        canActivateChild: [SessionGuard],
        component: PublicLayoutComponent,
        children: [
          {
            path: 'public',
            loadChildren: './pages/public-page/public-page.module#PublicPageModule'
          }
        ]
      },
      {
        path: '',
        component: AuthLayoutComponent,
        children: [
          {
            path: 'auth',
            loadChildren: './pages/auth-page/auth-page.module#AuthPageModule'
          }
        ]
      },
      {
        path: '**',
        redirectTo: 'auth',
        pathMatch: 'full'
      }
];
