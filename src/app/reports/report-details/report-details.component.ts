import { SetDuplicateDialogComponent } from './../set-duplicate-dialog/set-duplicate-dialog.component';
import { UpdateStatusDialogComponent } from './../update-status-dialog/update-status-dialog.component';
import { MatDialog } from '@angular/material';
import { IReport } from './../../interface';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import * as moment from 'moment';

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
    public dialog: MatDialog
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
      notes: [{ value: null, disabled: true }]
    });
  }

  ngOnInit() {

  }

  ngOnChanges (changes) {
    if (this.report) {
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
      people: [{ value: report.people.map(r => r.fname + ' ' + r.lname).join(', '), disabled: true }],
      properties: [{ value: report.properties.map(p => p.type).join(', '), disabled: true }],
      tags: [{ value: report.tags.join(', '), disabled: true }],
      createdAt: [{ value: report.createdAt, disabled: true }],
      updatedAt: [{ value: report.updatedAt, disabled: true }],
      notes: [{ value: notes, disabled: true }]
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

  isDuplicate () {
    console.log(this.report.isDuplicate);
    return this.report.isDuplicate;
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

}
