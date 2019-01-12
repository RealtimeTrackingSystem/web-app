import { FormGroup, Form, FormBuilder, Validators } from '@angular/forms';
import { ReportService } from './../../services/report.service';
import { Subscription } from 'rxjs/Subscription';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ReportActionCreator } from '../../store/action-creators/report.actioncreator';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';

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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.sendClearanceForm = this.formBuilder.group({
      clearanceNotes: [null, Validators.required],
      personId: [this.data._id],
      reporterId: [],
      reporterLname: [],
      reporterFname: [],
      reporterEmail: []
    });
  }

  onNoClick () {
    this.dialogRef.close();
  }

}
