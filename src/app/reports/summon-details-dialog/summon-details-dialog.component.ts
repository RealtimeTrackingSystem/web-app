import { ReportService } from './../../services/report.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ReportActionCreator } from '../../store/action-creators/report.actioncreator';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import * as moment from 'moment';
import { of } from 'rxjs';

@Component({
  selector: 'app-summon-details-dialog',
  templateUrl: './summon-details-dialog.component.html',
  styleUrls: ['./summon-details-dialog.component.scss']
})
export class SummonDetailsDialogComponent implements OnInit {

  public summonForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SummonDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private reportService: ReportService
  ) { }

  ngOnInit() {
    const { _id, type, count, compliance, createdAt  } = this.data;
    this.summonForm = this.formBuilder.group({
      _id: [{ value: _id, disabled: true }],
      type: [{ value: type, disabled: true }],
      count: [{ value: count, disabled: true }],
      expiration: [{ value: moment(createdAt).add(2, 'd').format('YYYY-MM-DD'), disabled: true }],
      compliance: [{ value: compliance, disabled: true }]
    });
  }

  setComplied () {
    return this.reportService.updateSummon (this.data._id, 'COMPLIED', 'Person complied to the summon request')
      .pipe(
        catchError((error) => of(error.error))
      )
      .toPromise()
      .then(result => {
        if (result.httpCode !== 201) {
          return swal('Warning', result.message || 'An Error occured', 'warning');
        } else {
          return swal('Success', 'Successfully updated summon', 'success');
        }
      })
      .then(() => {
        this.dialogRef.close();
      });
  }

  setNotComplied () {
    return this.reportService.updateSummon (this.data._id, 'NOTCOMPLIED', 'Person did not comply to the summon request')
      .pipe(
        catchError((error) => of(error.error))
      )
      .toPromise()
      .then(result => {
        if (result.httpCode !== 201) {
          return swal('Warning', result.message || 'An Error occured', 'warning');
        } else {
          return swal('Success', 'Successfully updated summon', 'success');
        }
      })
      .then(() => {
        this.dialogRef.close();
      });
  }



  onOkClick () {
    this.dialogRef.close();
  }

}
