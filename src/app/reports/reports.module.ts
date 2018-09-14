import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { ReportsTableComponent } from './reports-table/reports-table.component';
import { ReportDetailsComponent } from './report-details/report-details.component';
import { NewReportComponent } from './new-report/new-report.component';

import { MapsModule, MapPointerModalComponent } from '../maps';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MapsModule
  ],
  declarations: [
    ReportsTableComponent,
    ReportDetailsComponent,
    NewReportComponent
  ],
  exports: [
    ReportsTableComponent,
    ReportDetailsComponent,
    NewReportComponent
  ],
  entryComponents: [
    MapPointerModalComponent
  ]
})

export class ReportsModule {}
