import { Subscription } from 'rxjs/Subscription';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ReportActionCreator } from '../../store/action-creators/report.actioncreator';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';

@Component({
  selector: 'app-set-duplicate-dialog',
  templateUrl: './set-duplicate-dialog.component.html',
  styleUrls: ['./set-duplicate-dialog.component.scss']
})
export class SetDuplicateDialogComponent implements OnInit, OnDestroy {

  public reports: any;
  public reportsSubscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<SetDuplicateDialogComponent>,
    private reportActionCreator: ReportActionCreator,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.reportsSubscription = this.reportActionCreator.GetNonDuplicateReports()
      .pipe(
        map(result => result.reports || []),
        map(reports => {
          const hostId = this.data.report._host._id;
          const reportId = this.data.report._id;
          return reports.filter((r) => {
            return r._host._id === hostId && r._id !== reportId;
          });
        })
      )
      .subscribe(
        reports => {
          this.reports = reports;
        }
      );
  }

  ngOnDestroy() {
    this.reportsSubscription.unsubscribe();
  }

  onNoClick () {
    this.dialogRef.close();
  }

  onDuplicateClick(report) {
    return swal({
      title: 'Mark as duplicate?',
      text: 'Are you sure you want to mark this report as duplicate?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        return this.reportActionCreator.SetDuplicateReport(report._id, this.data.report._id)
          .toPromise();
      }
    })
    .then(result => {
      this.dialogRef.close();
    })
  }

}
