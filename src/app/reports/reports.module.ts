import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { ReportsTableComponent } from './reports-table/reports-table.component';
import { ReportDetailsComponent } from './report-details/report-details.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ReportsTableComponent,
    ReportDetailsComponent
  ],
  exports: [
    ReportsTableComponent,
    ReportDetailsComponent
  ]
})

export class ReportsModule {}
