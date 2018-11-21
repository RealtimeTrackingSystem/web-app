import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HostsListComponent } from './hosts-list/hosts-list.component';
import { MaterialModule } from '../app.module';
import { NewHostComponent } from './new-host/new-host.component';
import { MapsModule, MapPointerModalComponent } from './../maps';
import { HostPreviewComponent } from './host-preview/host-preview.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    MapsModule
  ],
  declarations: [
    HostsListComponent,
    NewHostComponent,
    HostPreviewComponent
  ],
  exports: [
    HostsListComponent,
    NewHostComponent,
    HostPreviewComponent
  ],
  entryComponents: [
    MapPointerModalComponent
  ]
})
export class HostsModule { }
