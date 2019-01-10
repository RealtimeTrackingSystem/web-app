import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutes } from './admin-page.routing';
import { DashboardModule } from '../../dashboard/dashboard.module';
import { HostJoinedViewComponent } from './host-joined-view/host-joined-view.component';
import { HostsModule } from '../../hosts';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminRoutes),
    FormsModule,
    ReactiveFormsModule,
    DashboardModule,
    HostsModule
  ],
  declarations: [
    HostJoinedViewComponent
  ],
  entryComponents: [
  ]
})

export class AdminPageModule {}
