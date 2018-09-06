import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PublicRoutes } from './public-page.routing';
import { DashboardModule } from '../../dashboard/dashboard.module';
import { HostListViewComponent } from './host-list-view/host-list-view.component';
import { HostsModule } from '../../hosts';
import { NewHostViewComponent } from './new-host-view/new-host-view.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PublicRoutes),
    FormsModule,
    ReactiveFormsModule,
    DashboardModule,
    HostsModule
  ],
  declarations: [
    HostListViewComponent,
    NewHostViewComponent
  ],
  entryComponents: [
  ]
})

export class PublicPageModule {}
