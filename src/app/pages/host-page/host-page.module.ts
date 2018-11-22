import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HostRoutes } from './host-page.routing';
import { DashboardModule } from '../../dashboard/dashboard.module';
import { ReportsTableViewComponent } from './reports-table-view/reports-table-view.component';
import { ReportsModule } from '../../reports';
import { ReportersModule } from '../../reporters';
import { ReportDetailViewComponent } from './report-detail-view/report-detail-view.component';
import { PendingHostRequestViewComponent } from './pending-host-request-view/pending-host-request-view.component';
import { ProfileModule } from '../../profile';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HostRoutes),
    FormsModule,
    ReactiveFormsModule,
    DashboardModule,
    ReportsModule,
    ReportersModule,
    ProfileModule
  ],
  declarations: [
    ReportsTableViewComponent,
    ReportDetailViewComponent,
    PendingHostRequestViewComponent
  ],
  entryComponents: [
  ]
})

export class HostPageModule {}
