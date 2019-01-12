import { SessionService } from './../../services/session.service';
import { FormGroup, Form, FormBuilder, Validators } from '@angular/forms';
import { ReportService } from './../../services/report.service';
import { Subscription } from 'rxjs/Subscription';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ReportActionCreator } from '../../store/action-creators/report.actioncreator';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { of } from 'rxjs';

@Component({
  selector: 'app-send-clearance-dialog',
  templateUrl: './send-clearance-dialog.component.html',
  styleUrls: ['./send-clearance-dialog.component.scss']
})
export class SendClearanceDialogComponent implements OnInit {
  public sendClearanceForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<SendClearanceDialogComponent>,
    private reportService: ReportService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    const { reporterID, fname, lname, email } = this.sessionService.SessionRead().user;
    this.sendClearanceForm = this.formBuilder.group({
      clearanceNotes: [null, Validators.required],
      personId: [this.data._id, Validators.required],
      reporterId: [reporterID, Validators.required],
      reporterLname: [lname, Validators.required],
      reporterFname: [fname, Validators.required],
      reporterEmail: [email, Validators.required]
    });
  }

  onNoClick () {
    this.dialogRef.close();
  }

  sendClearance () {
    if (this.sendClearanceForm.valid) {
      return swal({
        title: 'Issue Clearance?',
        text: 'Do you want to proceed Issuing clearance?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          return this.reportService.sendClearance(this.sendClearanceForm.value)
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
          this.dialogRef.close();
        }
      })
    }
  }

}
