import { SessionActionCreator } from './../../store/action-creators/session.actioncreator';
import { IUser } from './../../interface/user/user.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { select } from '@angular-redux/store';
import { IUserDataStore } from 'app/store/user-data.store';
import swal from 'sweetalert2';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit, OnDestroy {
  @select(s => s.userData) $userData: Observable<IUserDataStore>;
  public userData: IUserDataStore;
  private userDataSubscription: Subscription;
  public userDataForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private sessionActionCreator: SessionActionCreator
  ) { }

  ngOnInit() {
    this.userDataSubscription = this.$userData
      .subscribe((userData: IUserDataStore) => {
        if (userData) {
          console.log(userData);
          this.userData = userData;
          this.loadUserDataForm(userData.user);
        }
      })
  }

  ngOnDestroy() {
    this.userDataSubscription.unsubscribe();
  }

  getProfilePic() {
    if (this.userData.user && this.userData.user.profilePicture) {
      return this.userData.user.profilePicture.metaData.secure_url;
    }
    return null;
  }

  loadUserDataForm (user: IUser) {
    this.userDataForm = this.formBuilder.group({
      username: [user.username, Validators.required],
      email: [user.email, Validators.required],
      alias: [user.alias, Validators.required],
      fname: [user.fname, Validators.required],
      lname: [user.lname, Validators.required],
      age: [user.age, Validators.required],
      gender: [{ value: user.gender, disabled: true }],
      street: [user.street, Validators.required],
      barangay: [user.barangay, Validators.required],
      city: [user.city, Validators.required],
      region: [user.region, Validators.required],
      country: [user.country, Validators.required],
      zip: [user.zip, Validators.required]
    });
  }

  updateProfile () {
    if (this.userDataForm.valid) {
      this.sessionActionCreator.UpdateProfile({...this.userDataForm.value, gender: this.userData.user.gender})
        .toPromise()
        .then((result) => {
          if (result.httpCode && result.httpCode !== 201) {
            return swal('Update Profile', result.message, 'warning');
          } else {
            return swal('Update Profile', 'Successfully updated profile', 'success');
          }
        })
        .catch((err) => {
          return swal('Update Profile Error', 'An error occured while updating profile', 'error');
        });
    }
  }
}
