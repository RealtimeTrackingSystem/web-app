import { SessionActionCreator } from './../../store/action-creators/session.actioncreator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public changePasswordForm: FormGroup
  public loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private sessionActionCreator: SessionActionCreator
  ) { }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: [null, Validators.required],
      newPassword: [null, Validators.required],
      passwordConfirmation: [null, Validators.required]
    });
  }

  changePassword() {
    const { oldPassword, newPassword, passwordConfirmation } = this.changePasswordForm.value;
    if (this.loading) {
      return null;
    } else if (!this.changePasswordForm.valid) {
      return swal('Change Password', 'Please complete the form', 'warning');
    } else if (newPassword !== passwordConfirmation) {
      return swal('Change Password', 'New Password should be the same with Retyped password', 'warning');
    } else {
      this.loading = true;
      return this.sessionActionCreator.ChangePassword(oldPassword, newPassword, passwordConfirmation)
        .toPromise()
        .then((response) => {
          this.loading = false;
          switch (response.httpCode) {
            case 400: {
              return swal('Change Password Warning', response.message, 'warning');
            }
            case 201: {
              this.changePasswordForm.reset();
              return swal('Change Password', 'Successfully Changed Password', 'success');
            }
            default: {
              return swal('Change Password Error', 'An error occured while changing password', 'error');
            }
          }
        })
        .catch((error) => {
          this.loading = false;
          return swal('Change Password Error', 'An error occured while changing password', 'error');
        })
    }
  }

}
