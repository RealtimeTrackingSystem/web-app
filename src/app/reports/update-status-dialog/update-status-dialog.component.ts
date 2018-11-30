import { ReportActionCreator } from './../../store/action-creators/report.actioncreator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-update-status-dialog',
  templateUrl: './update-status-dialog.component.html',
  styleUrls: ['./update-status-dialog.component.scss']
})
export class UpdateStatusDialogComponent implements OnInit {
  public updateReportStatusForm: FormGroup;
  public reportStatuses = [ 'NEW', 'VALIDATED', 'INPROGRESS', 'DONE', 'INVALID'];
  public loading = false;
  constructor(
    public dialogRef: MatDialogRef<UpdateStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private reportActionCreator: ReportActionCreator
  ) { }

  ngOnInit() {
    this.updateReportStatusForm = this.formBuilder.group({
      reportId: [this.data.report._id, Validators.required],
      status: [this.data.report.status, Validators.required],
      note: [null, Validators.required]
    });
  }

  onNoClick () {
    this.dialogRef.close();
  }

  updateStatus() {
    if (this.updateReportStatusForm.valid) {
      if (!this.loading) {
        this.loading = true;
        const { reportId, status, note } = this.updateReportStatusForm.value;
        this.reportActionCreator.UpdateReportStatus(reportId, status, note)
          .toPromise()
          .then((result) => {
            switch (result.httpCode) {
              case 201: {
                return swal('Update Report Status', 'Successfully updated report status', 'success');
              }
              case 400: {
                return swal('Update Report Status', result.message, 'warning');
              }
              default: {
                return swal('Update Report Status', 'An error occured while updating report status', 'error');
              }
            }
          })
          .then(() => {
            this.loading = true;
            this.dialogRef.close();
          })
          .catch(err => {
            this.loading = true;
            return swal('Update Report Status', 'An error occured while updating report status', 'error');
          });
      }
    } else {
      return swal('Update Report Status', 'Please complete the form', 'info');
    }
  }

}
