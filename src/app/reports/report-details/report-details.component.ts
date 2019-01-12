import { AddMediationNoteDialogComponent } from './../add-mediation-note-dialog/add-mediation-note-dialog.component';
import { SummonDetailsDialogComponent } from './../summon-details-dialog/summon-details-dialog.component';
import { ReportService } from './../../services/report.service';
import { catchError } from 'rxjs/operators';
import { ReportActionCreator } from 'app/store/action-creators';
import { SetDuplicateDialogComponent } from './../set-duplicate-dialog/set-duplicate-dialog.component';
import { UpdateStatusDialogComponent } from './../update-status-dialog/update-status-dialog.component';
import { MatDialog } from '@angular/material';
import { IReport } from './../../interface';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import * as moment from 'moment';
import swal from 'sweetalert2';
import { of } from 'rxjs';
import { UpdateMediationNotesDialogComponent } from '../update-mediation-notes-dialog/update-mediation-notes-dialog.component';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.scss']
})
export class ReportDetailsComponent implements OnInit, OnChanges {

  @Input() report: IReport;
  public reportDetails = 'Report Details';
  public reportDetailForm: FormGroup;
  public photos = [];

  public lat = 0;
  public lng = 0;
  public markerLat = 0;
  public markerLng = 0;
  public zoom = 18;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private reportService: ReportService,
    private reportActionCreator: ReportActionCreator
  ) {
    this.reportDetailForm = this.formBuilder.group({
      _id: [{ value: null, disabled: true }],
      title: [{ value: null, disabled: true}],
      description: [{ value: null, disabled: true}],
      location: [{ value: null, disabled: true}],
      long:  [{ value: null, disabled: true}],
      lat: [{ value: null, disabled: true }],
      _reporter: [{ value: null, disabled: true }],
      _host: [{ value: null, disabled: true }],
      status: [{ value: null, disabled: true }],
      people: [{ value: null, disabled: true }],
      properties: [{ value: null, disabled: true }],
      medias: [{ value: null, disabled: true }],
      tags: [{ value: null, disabled: true }],
      createdAt: [{ value: null, disabled: true }],
      updatedAt: [{ value: null, disabled: true }],
      category: [{ value: null, disabled: true }],
      notes: [{ value: null, disabled: true }],
      urgency: [{ value: null, disabled: true }]
    });
  }

  ngOnInit() {

  }

  ngOnChanges (changes) {
    if (this.report) {
      console.log(this.report.people);
      this.loadReportDetails(this.report);
    }
  }

  loadReportDetails (report: IReport) {
    const notes = report.notes
      .map(n => {
        return moment(n.updatedAt).format('YYYY-MM-DD HH:MM') + ' Update: ' + n.text;
      }).join('\n\n');
    this.photos = report.medias;
    this.lat = report.lat;
    this.lng = report.long;
    this.markerLat = report.lat;
    this.markerLng = report.long;
    this.reportDetailForm = this.formBuilder.group({
      _id: [{ value: report._id, disabled: true }, Validators.required],
      title: [{ value: report.title, disabled: true}, Validators.required],
      description: [{ value: report.description, disabled: true}],
      location: [{ value: report.location, disabled: true}],
      long:  [{ value: report.long, disabled: true}],
      lat: [{ value: report.lat, disabled: true }],
      _reporter: [{ value: report._reporter['fname'] + ' ' + report._reporter['lname'], disabled: true }],
      _host: [{ value: report._host ? report._host['name'] : 'Individual Report', disabled: true }],
      status: [{ value: report.status, disabled: true }],
      people: [{ value: report.people
        .map(r => r.fname + ' ' + r.lname + `${r.isCulprit ? ' (Suspect)' : ' (Victim)'}`).join(', '), disabled: true }],
      properties: [{ value: report.properties.map(p => p.type).join(', '), disabled: true }],
      tags: [{ value: report.tags.join(', '), disabled: true }],
      createdAt: [{ value: report.createdAt, disabled: true }],
      updatedAt: [{ value: report.updatedAt, disabled: true }],
      notes: [{ value: notes, disabled: true }],
      category: [{ value: report.category ? report.category.name : '', disabled: true }],
      urgency: [{ value: report.urgency, disabled: true }]
    });
  }

  mapClicked(event) {
    console.log(event);
  }

  updateStatusDialog() {
    const dialogRef = this.dialog.open(UpdateStatusDialogComponent, {
      width: '500px',
      data: { report: this.report }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  summonDetailsDialog (summon) {
    const dialogRef = this.dialog.open(SummonDetailsDialogComponent, {
      width: '750px',
      data: summon
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  addMediationNoteDialog () {
    const dialogRef = this.dialog.open(AddMediationNoteDialogComponent, {
      width: '750px',
      data: { report: this.report }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  isDuplicate () {
    return this.report && this.report.isDuplicate;
  }

  isVoid () {
    return this.report && this.report.status === 'VOID';
  }

  setDuplicate() {
    const dialogRef = this.dialog.open(SetDuplicateDialogComponent, {
      width: '750px',
      data: { report: this.report }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  removeDuplicate() {
    if (this.report) {
      const duplicate = this.report._id;
      return this.reportActionCreator.RemoveDuplicateReport(duplicate)
        .toPromise()
        .then();
    }
  }

  seeOriginal() {
    this.router.navigate(['/host/reports/details/' + this.report.duplicateParent._id]);
  }

  onClickDetails(report) {
    this.router.navigate(['/host/reports/details/' + report._id]);
  }

  sendSummon (event) {
    return swal({
      title: 'Send Summon Request?',
      text: 'Do you want to proceed sending summon request?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        return this.reportService.sendSummon(event._id)
          .pipe(
            catchError(error => of(error.error))
          )
          .toPromise();
      }
    })
    .then(result => {
      if (result.httpCode !== 201) {
        return swal('Warning', result.message || 'An error occured', 'warning');
      } else {
        return swal('Success', 'Successfully sent summon', 'success');
      }
    })
  }

  sendClearance (event) {
    console.log(event);
  }

}
