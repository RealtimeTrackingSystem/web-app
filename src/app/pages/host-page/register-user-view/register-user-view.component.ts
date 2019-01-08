import { IHostMember } from './../../../interface/host/host-member.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { SessionActionCreator } from '../../../store/action-creators';
import swal from 'sweetalert2';
import { map, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-register-user-view',
  templateUrl: './register-user-view.component.html',
  styleUrls: ['./register-user-view.component.scss']
})
export class RegisterUserViewComponent implements OnInit {

  public genders = [
    { name: 'Male', value: 'M' },
    { name: 'Female', value: 'F' }
  ];
  public registrationForm: FormGroup;

  @select(s => s.userData.activeHost.hostMember) $hostMember: Observable<IHostMember>;


  constructor(
    private formBuilder: FormBuilder,
    private sessionActionCreator: SessionActionCreator,
    public router: Router
  ) { }

  ngOnInit() {
    this.$hostMember
    .pipe(
      map((hostMember) => {
        this.loadForm(hostMember._id);
      })
    )
      .toPromise()
      .then();
  }

  loadForm (hostId: string = null) {
    this.registrationForm = this.formBuilder.group({
      username: [null, Validators.required],
      email: [null, Validators.required],
      fname: [null, Validators.required],
      lname: [null, Validators.required],
      gender: ['M', Validators.required],
      birthday: [null, Validators.required],
      alias: [null, Validators.required],
      street: [null, Validators.required],
      barangay: [null, Validators.required],
      city: [null, Validators.required],
      region: [null, Validators.required],
      country: [null, Validators.required],
      zip: [null, Validators.required],
      password: [null, Validators.required],
      passwordConfirmation: [null, Validators.required],
      hostId: [hostId, Validators.required]
    });
  }

  submit() {
    console.log(this.registrationForm.value);
    if (this.registrationForm.valid) {
      return this.sessionActionCreator.AddNewUser(this.registrationForm.value)
        .toPromise()
        .then(result => {
          if (result.httpCode === 201) {
            return swal('Registration successful', 'You can now login', 'success');
          } else {
            throw new Error('Internal server error');
          }
        })
        .then((result) => {
          this.loadForm();
        })
        .catch(err => {
          return this.signupError(err);
        });
    } else {
      return swal('Invalid Form', 'Please complete the form', 'info');
    }
  }

  signupError (err) {
    if (err.httpCode === 400) {
      return swal('Invalid Input', err.message, 'warning');
    } else {
      return swal('Server Not Available', 'Server is temporarily Unavailable', 'error');
    }
  }

}
