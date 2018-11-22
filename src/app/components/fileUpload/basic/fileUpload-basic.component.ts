import { Component, OnInit, Input, Output, ElementRef, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { DialogService, SessionService } from '../../../services';

import { ISession } from '../../../interface';

@Component({
  selector: 'app-fileUpload-basic',
  templateUrl: './fileUpload-basic.component.html',
  styleUrls: ['./fileUpload-basic.component.scss']
})
export class FileUploadBasicComponent implements OnInit {

  @Input() fileAlias: string; // file alias must be the same in backend
  @Input() URL; // backend url address
  @Input() method: string;
  @Output() onErrorCallback = new EventEmitter<any>();
  @Output() onSuccessCallback = new EventEmitter<any>();

  private headers = new Headers();
  public sending = false;
  public uploader: FileUploader = new FileUploader({ url: this.URL, itemAlias: this.fileAlias });

  private GetSessionToken(): string {
    const session: ISession = this.sessionService.SessionRead();
    if (!session) {
      return 'invalid token';
    } else {
      return session.token;
    }
  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {

    };
  }

  refresh(): void {
    window.location.reload();
  }

  constructor(
    private http: Http,
    private el: ElementRef,
    private dialogService: DialogService,
    private sessionService: SessionService
  ) { }

  getData(data) {
    return data.data;
  }

  upload() {
    // this.headers.append('Access-Control-Allow-Origin', '*');
    // this.headers.append('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    // this.headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (!this.sending) {
      this.sending = true;
      this.headers.append('Authorization', this.GetSessionToken());
      const options = new RequestOptions({ headers: this.headers });
      const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#file');
      const fileCount: number = inputEl.files.length;
      const formData = new FormData();
      if (fileCount > 0) { // a file was selected
        for (let i = 0; i < fileCount; i++) {
          formData.append(this.fileAlias, inputEl.files.item(i));
        }
        this.http[this.method.toLowerCase() || 'post'](this.URL, formData, options)
          .map((res: any) => res.json())
          .map(data => this.getData(data))
          .subscribe(
            (result) => {
              this.sending = false;
              this.onSuccessCallback.emit(result);
            },
            (error) => {
              this.sending = false;
              this.onErrorCallback.emit(error);
            }
          );
      }
    }
  }
}
