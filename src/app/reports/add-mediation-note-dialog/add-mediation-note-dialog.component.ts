import { environment } from './../../../environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Input, Output, ElementRef, EventEmitter, Inject } from '@angular/core';
import { ReportActionCreator } from '../../store/action-creators/report.actioncreator';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { DialogService, SessionService } from '../../services';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ISession } from '../../interface';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

@Component({
  selector: 'app-add-mediation-note-dialog',
  templateUrl: './add-mediation-note-dialog.component.html',
  styleUrls: ['./add-mediation-note-dialog.component.scss']
})
export class AddMediationNoteDialogComponent implements OnInit {
  public URL = environment.API_URL + `/api/reports/mediationNotes`;
  public addMediationNoteForm: FormGroup;
  private headers = new Headers();
  public sending = false;
  public uploader: FileUploader = new FileUploader({ url: this.URL, itemAlias: 'mediation' });

  constructor(
    public dialogRef: MatDialogRef<AddMediationNoteDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: Http,
    private el: ElementRef,
    private dialogService: DialogService,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    const reporterId = this.sessionService.SessionRead().user.reporterID;
    const { _id, _reporter, } = this.data.report;
    this.addMediationNoteForm = this.formBuilder.group({
      note: [null, Validators.required],
      reportId: [_id],
      reporterId: [reporterId]
    });
  }

  private GetSessionToken(): string {
    const session: ISession = this.sessionService.SessionRead();
    if (!session) {
      return 'invalid token';
    } else {
      return session.token;
    }
  }

  upload() {
    // this.headers.append('Access-Control-Allow-Origin', '*');
    // this.headers.append('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    // this.headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (!this.sending && this.addMediationNoteForm.valid) {
      this.sending = true;
      this.headers.append('Authorization', this.GetSessionToken());
      const options = new RequestOptions({ headers: this.headers });
      const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#file');
      const fileCount: number = inputEl.files.length;
      const formData = new FormData();
      if (fileCount > 0) { // a file was selected
        for (let i = 0; i < fileCount; i++) {
          formData.append('mediation', inputEl.files.item(i));
        }
        formData.append('note', this.addMediationNoteForm.value.note);
        formData.append('reporterId', this.addMediationNoteForm.value.reporterId);
        formData.append('reportId', this.addMediationNoteForm.value.reportId);
        this.http.post(this.URL, formData, options)
          .map((res: any) => res.json())
          .subscribe(
            (result) => {
              this.sending = false;
             console.log(result);
            },
            (error) => {
              this.sending = false;
              console.log(error);
            }
          );
      }
    }
  }

}
