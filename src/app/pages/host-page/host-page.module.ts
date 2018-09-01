import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HostRoutes } from './host-page.routing';
import { DashboardModule } from '../../dashboard/dashboard.module';
import { ReportsTableViewComponent } from './reports-table-view/reports-table-view.component';
import { ReportsModule } from '../../reports';
import { ReportDetailViewComponent } from './report-detail-view/report-detail-view.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HostRoutes),
    FormsModule,
    ReactiveFormsModule,
    DashboardModule,
    ReportsModule
  ],
  declarations: [
    ReportsTableViewComponent,
    ReportDetailViewComponent
  ],
  entryComponents: [
  ]
})

export class HostPageModule {}
