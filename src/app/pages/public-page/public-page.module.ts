import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PublicRoutes } from './public-page.routing';
import { DashboardModule } from '../../dashboard/dashboard.module';
import { HostListViewComponent } from './host-list-view/host-list-view.component';
import { HostsModule } from '../../hosts';
import { NewHostViewComponent } from './new-host-view/new-host-view.component';
import { NewReportViewComponent } from './new-report-view/new-report-view.component';
import { ReportsModule } from '../../reports';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PublicRoutes),
    FormsModule,
    ReactiveFormsModule,
    DashboardModule,
    HostsModule,
    ReportsModule
  ],
  declarations: [
    HostListViewComponent,
    NewHostViewComponent,
    NewReportViewComponent
  ],
  entryComponents: [
  ]
})

export class PublicPageModule {}
