import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { SessionActionCreator } from '../../../store/action-creators';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import * as moment from 'moment';

declare var $: any;

@Component({
    selector: 'app-login-cmp',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit, OnDestroy {
    test: Date = new Date();
    public genders = [
      { name: 'Male', value: 'M' },
      { name: 'Female', value: 'F' }
    ];
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;
    public registrationForm: FormGroup;

    constructor(
      private element: ElementRef,
      private formBuilder: FormBuilder,
      private sessionActionCreator: SessionActionCreator,
      public router: Router
    ) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit() {
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
        passwordConfirmation: [null, Validators.required]
      });
      var navbar : HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
      const body = document.getElementsByTagName('body')[0];
      body.classList.add('login-page');
      body.classList.add('off-canvas-sidebar');
      const card = document.getElementsByClassName('card')[0];
      setTimeout(function() {
          // after 1000 ms we add the class animated to the login/register card
          card.classList.remove('card-hidden');
      }, 700);
    }
    sidebarToggle() {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible == false) {
            setTimeout(function() {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }
    ngOnDestroy() {
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('login-page');
      body.classList.remove('off-canvas-sidebar');
    }

    submit() {
      if (this.registrationForm.valid) {
        return this.sessionActionCreator.Register(this.registrationForm.value)
          .toPromise()
          .then(result => {
            if (result.token) {
              return swal('Registration successful', 'You can now login', 'success');
            } else {
              throw new Error('Internal server error');
            }
          })
          .then((result) => {
            if (result) {
              this.router.navigate([`/auth/login`]);
            }
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

    minDate () {
      return moment().subtract(1, 'd').format('YYYY-MM-DD');
    }
}
