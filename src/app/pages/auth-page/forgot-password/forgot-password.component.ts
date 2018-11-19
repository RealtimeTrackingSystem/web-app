import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { SessionActionCreator } from '../../../store/action-creators';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})

export class ForgotPasswordComponent implements OnInit {

  test: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;
    public resetPasswordForm: FormGroup;

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
      this.resetPasswordForm = this.formBuilder.group({
        email: [null, Validators.required]
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

    resetPassword() {
      if (this.resetPasswordForm.valid) {
        this.sessionActionCreator.ForgotPassword(this.resetPasswordForm.value.email)
          .toPromise()
          .then(response => {
            switch (response.httpCode) {
              case 400: {
                return swal('Reset Password', response.message, 'warning');
              }
              case 201: {
                this.resetPasswordForm.reset();
                return swal('Reset Password', 'Successfully change password. \n Please check your email.', 'info');
              }
              default: {
                return swal('Reset Password', response.message, 'error');
              }
            }
          })
          .catch(error => {
            return swal('Reset Password', 'Internal Server Error', 'error');
          })
      } else {
        return swal('Invalid Form', 'Please enter your email', 'info');
      }
    }
}
