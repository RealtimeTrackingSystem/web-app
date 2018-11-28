import { MatDialog, MatDialogModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';


import { MaterialModule } from '../app.module';
import { ReportsTableComponent } from './reports-table/reports-table.component';
import { ReportDetailsComponent } from './report-details/report-details.component';
import { NewReportComponent } from './new-report/new-report.component';

import { MapsModule, MapPointerModalComponent } from '../maps';
import { ComponentModule } from '../components';
import { UpdateStatusDialogComponent } from './update-status-dialog/update-status-dialog.component';
import { SetDuplicateDialogComponent } from './set-duplicate-dialog/set-duplicate-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MapsModule,
    AgmCoreModule,
    ComponentModule,
    MatDialogModule
  ],
  declarations: [
    ReportsTableComponent,
    ReportDetailsComponent,
    NewReportComponent,
    UpdateStatusDialogComponent,
    SetDuplicateDialogComponent
  ],
  exports: [
    ReportsTableComponent,
    ReportDetailsComponent,
    NewReportComponent,
    UpdateStatusDialogComponent,
    SetDuplicateDialogComponent
  ],
  entryComponents: [
    MapPointerModalComponent,
    UpdateStatusDialogComponent,
    SetDuplicateDialogComponent
  ]
})

export class ReportsModule {}
