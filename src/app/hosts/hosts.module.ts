import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HostsListComponent } from './hosts-list/hosts-list.component';
import { MaterialModule } from '../app.module';
import { NewHostComponent } from './new-host/new-host.component';
import { MapsModule, MapPointerModalComponent } from './../maps';

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
    NewHostComponent
  ],
  exports: [
    HostsListComponent,
    NewHostComponent
  ],
  entryComponents: [
    MapPointerModalComponent
  ]
})
export class HostsModule { }
