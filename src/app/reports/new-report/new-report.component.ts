import { map, tap, catchError } from 'rxjs/operators';
import { IHost } from './../../interface/host/host.interface';
import { Observable, of } from 'rxjs';
import { HostService } from './../../services/host.service';
import { NgRedux } from '@angular-redux/store';
import { ReportActionCreator } from './../../store/action-creators/report.actioncreator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MapPointerModalComponent } from '../../maps';
import swal from 'sweetalert2';
import { IAppState } from '../../store/app.store';

@Component({
  selector: 'app-new-report',
  templateUrl: './new-report.component.html',
  styleUrls: ['./new-report.component.scss']
})
export class NewReportComponent implements OnInit {
  public newReportForm: FormGroup;
  public hostList: IHost[] = [];

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private ngRedux: NgRedux<IAppState>,
    private reportActionCreator: ReportActionCreator,
    private hostService: HostService
  ) {
    this.hostService.GetAllHost()
      .pipe(
        catchError(error => of(error.error)),
        tap(result => {
          if (result.httpCode === 200) {
            this.hostList = result.hosts;
          } else {
            this.hostList = [];
          }
        }),
        map((result: any) => result.hosts)
      )
      .toPromise()
      .then(console.log)
  }

  ngOnInit() {
    const userData = this.ngRedux.getState().userData;
    this.initForm(userData.reporter._id);
  }

  initForm (reporterId: string) {
    this.newReportForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      location: [null, Validators.required],
      long: [null],
      lat: [null],
      hostId: [null, Validators.required],
      reporterId: [reporterId, Validators.required],
      people: this.formBuilder.array([]),
      properties: this.formBuilder.array([]),
      medias: this.formBuilder.array([]),
      tags: this.formBuilder.array([
        this.initTags()
      ]),
    });
  }

  openPointer(): void {
    const dialogRef = this.dialog.open(MapPointerModalComponent, {
      width: '750px',
      data: {
        lat: Number(this.newReportForm.value.lat) || 14.6527531,
        lng: Number(this.newReportForm.value.long) || 120.9824008,
        markerLat: Number(this.newReportForm.value.lat) || 14.6527531,
        markerLng: Number(this.newReportForm.value.long) || 120.9824008,
        zoom: 15
      }
    });

    dialogRef.afterClosed().toPromise()
      .then(result => {
        this.newReportForm.value.long = result.lng;
        this.newReportForm.value.lat = result.lat;
      });
  }

  initPeople () {
    return this.formBuilder.group({});
  }

  initProperties () {
    return this.formBuilder.group({});
  }

  initMedias () {
    return this.formBuilder.group({});
  }

  initTags () {
    return this.formBuilder.control('report'); // @TODO update this
  }

  sendReport () {
    console.log(this.newReportForm.value);
    if (this.newReportForm.valid) {
      this.reportActionCreator.SendReport(this.newReportForm.value)
        .toPromise()
        .then((response) => {
          if (response.httpCode === 201) {
            const userData = this.ngRedux.getState().userData;
            this.initForm(userData.reporter._id);
            return swal('Report Sent', 'Your Report was successfully sent', 'success');
          } else {
            return swal('Report Not Sent', response.message, 'warning');
          }
        });
    } else {
      swal('Invalid Form', 'Please Fillup all the fields', 'warning');
    }
  }

}
