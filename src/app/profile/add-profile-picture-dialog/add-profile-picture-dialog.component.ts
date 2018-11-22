import { SessionActionCreator } from './../../store/action-creators/session.actioncreator';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import swal from 'sweetalert2';

@Component({
  selector: 'app-add-profile-picture-dialog',
  templateUrl: './add-profile-picture-dialog.component.html',
  styleUrls: ['./add-profile-picture-dialog.component.scss']
})
export class AddProfilePictureDialogComponent implements OnInit {
  public fileAlias = 'profilepic';
  public URL = `${environment.API_URL}/api/auth/profilepic`;

  constructor(
    public dialogRef: MatDialogRef<AddProfilePictureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sessionActionCreator: SessionActionCreator
    ) {}

  ngOnInit() {
  }

  onNoClick () {
    this.dialogRef.close();
  }

  onUploadError(data) {
    let response;
    try {
      response = JSON.parse(data._body);
    } catch (e) {
      response = { status: 'ERROR', httpCode: 500, message: 'Internal Server Error' };
    }
    if (response.httpCode < 500 && response.httpCode > 399) {
      return swal('Profile Picture Upload', response.message, 'warning');
    } else {
      return swal('Profile Picture Upload', response.message, 'error');
    }

  }

  onUploadSuccess(data) {
    this.sessionActionCreator.SessionRehydrate()
      .toPromise()
      .then(() => {
        return swal('Profile Picture Upload', 'Successfully Change Profile Picture', 'success');
      })
      .then(() => {
        this.dialogRef.close();
      });
  }

}
