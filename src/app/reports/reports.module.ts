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
import { SuspectsTableComponent } from './suspects-table/suspects-table.component';
import { PeopleTableComponent } from './people-table/people-table.component';
import { AddSummonDialogComponent } from './add-summon-dialog/add-summon-dialog.component';
import { SummonDetailsDialogComponent } from './summon-details-dialog/summon-details-dialog.component';
import { MediationNotesTableComponent } from './mediation-notes-table/mediation-notes-table.component';
import { UpdateMediationNotesDialogComponent } from './update-mediation-notes-dialog/update-mediation-notes-dialog.component';
import { AddMediationNoteDialogComponent } from './add-mediation-note-dialog/add-mediation-note-dialog.component';
import { SendClearanceDialogComponent } from './send-clearance-dialog/send-clearance-dialog.component';

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
    SetDuplicateDialogComponent,
    SuspectsTableComponent,
    PeopleTableComponent,
    AddSummonDialogComponent,
    SummonDetailsDialogComponent,
    MediationNotesTableComponent,
    UpdateMediationNotesDialogComponent,
    AddMediationNoteDialogComponent,
    SendClearanceDialogComponent
  ],
  exports: [
    ReportsTableComponent,
    ReportDetailsComponent,
    NewReportComponent,
    UpdateStatusDialogComponent,
    SetDuplicateDialogComponent,
    SuspectsTableComponent,
    AddSummonDialogComponent,
    PeopleTableComponent,
    SummonDetailsDialogComponent,
    MediationNotesTableComponent,
    UpdateMediationNotesDialogComponent,
    AddMediationNoteDialogComponent,
    SendClearanceDialogComponent
  ],
  entryComponents: [
    MapPointerModalComponent,
    UpdateStatusDialogComponent,
    SetDuplicateDialogComponent,
    AddSummonDialogComponent,
    SummonDetailsDialogComponent,
    UpdateMediationNotesDialogComponent,
    AddMediationNoteDialogComponent,
    SendClearanceDialogComponent
  ]
})

export class ReportsModule {}
