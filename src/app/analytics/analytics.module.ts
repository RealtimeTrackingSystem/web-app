import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportCountComponent } from './report-count/report-count.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ReportCountComponent],
  exports: [ReportCountComponent]
})
export class AnalyticsModule { }
