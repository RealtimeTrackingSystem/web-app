import { ReportService } from './../../services/report.service';
import { Subscription } from 'rxjs/Subscription';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ReportActionCreator } from '../../store/action-creators/report.actioncreator';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { of } from 'rxjs';

@Component({
  selector: 'app-add-summon-dialog',
  templateUrl: './add-summon-dialog.component.html',
  styleUrls: ['./add-summon-dialog.component.scss']
})
export class AddSummonDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddSummonDialogComponent>,
    private reportService: ReportService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick () {
    this.dialogRef.close();
  }

  onAddSummon() {
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
        return this.reportService.sendSummon(this.data.personId)
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
